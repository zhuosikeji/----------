//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    productList: null,
    'checkAll': false,
    'totalCount': 0,
    'totalPrice': 0,
    timeSetAdd: null
  },

  onLoad: function() {
    //获取用户购物车内容
    this.getAllProductFirstClassify();
  },
  onShow: function(){
    //切到改页就加载一次
    this.getAllProductFirstClassify();
  },
  /**
   * 从后台获取用户购物车信息
   */
  getAllProductFirstClassify: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/productCart/getProductCart?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res); 
        var productCartVOList = res.data.data.productCartVOList;
        var productList = new Array(productCartVOList.length);
        var x = 0;
        //TODO 修改属性名和后台同步
        for (var i = 0; i < productCartVOList.length; i++) {
          var product = {
            productName: "",
            productId: "",
            productImage: "",
            checked: false,
            count: null, //数量
            oldprice: "",
            discount: 1,
            price: 0,
            cartId: 0
          }
          product.productName = productCartVOList[i].productTitle;
          product.productId = productCartVOList[i].productId;
          product.productImage = app.globalData.url + ':80/common/file/showPicture.do?id=' + productCartVOList[i].productCovermap; 
          product.discount = productCartVOList[i].productDiscount;
          product.count = productCartVOList[i].productNumber;
          product.oldprice = productCartVOList[i].memberPrice;
          product.cartId = productCartVOList[i].id
          console.log(product);
          productList[x++] = product;
        }
        console.log('productList:');
        console.log(productList);
        that.setData({
          'productList': productList,
        })
        //计算总金额
        that.calculateTotal();
        wx.hideLoading();
      }
    })
  },



  /**
   * 结算订单
   */
  settlementOrder: function() {
    var that = this;
    if (this.data.totalCount == 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none',
        duration: 2000
      })
    } else {
      var productList = that.data.productList;
      var x = 0;
      var ToproductList = [];
      for (var i = 0; i < productList.length; i++) {
        if(productList[i].checked == true){
          var product = productList[i];
          ToproductList.push(product);
        }
      }
      console.log("ToproductList:");
      console.log(ToproductList);
      //购物车数据存到app里，因为url传递参数有长度限制，所以只能这么搞
      app.globalData.productCartList = ToproductList;
      console.log(app.globalData.productCartList);
      wx.navigateTo({
        url: '../confirm/confirm?type=0'
      })
    }
  },
  /**
   * 计算商品总数和总价
   */
  calculateTotal: function() {
    //获取商品集合
    var productList = this.data.productList;
    //购物车总数
    var totalCount = 0;
    //购物车总价
    var totalPrice = 0;
    //循环遍历
    for (var i = 0; i < productList.length; i++) {
      productList[i].price = (parseFloat(productList[i].oldprice) * productList[i].discount).toFixed(2);
      if (productList[i].checked) {
        totalCount += productList[i].count;
        totalPrice += productList[i].count * parseFloat(productList[i].price);
      }
    }
    //完成总价和总数的计算
    totalPrice = totalPrice.toFixed(2);
    console.log(totalPrice);
    this.setData({
      'productList': productList
    });

    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },

  /**
   * 用户点击商品减1
   */
  minusNumber: function(e) {
    //获取点击的索引
    var index = e.target.dataset.index;
    var productList = this.data.productList;
    var count = productList[index].count;
    if (count <= 1) {
      return;
    } else {
      productList[index].count--;
      this.setData({
        'productList': productList
      });
      this.calculateTotal();
    }
  },


  /**
   * 用户点击商品加1
   */
  addNumber: function(e) {
    //获取点击的索引
    var index = e.target.dataset.index;
    var productList = this.data.productList;
    var count = productList[index].count;

    productList[index].count++;
    this.setData({
      'productList': productList
    });
    //再计算一次金额
    this.calculateTotal();
    // 三秒内不能点击,
    // 每次点计时器开始，再次点计时器重置 三秒内如果我点击了，给个标准让其不满足send条件，
    this.time(productList[index].productId, productList[index].count);
  },
  /**
   * 
   */
  time: function(id,num) {
    var that = this;
    var second = 0;
    
    if (that.data.timeSetAdd != null) {
      clearInterval(that.data.timeSetAdd);
    }
    that.data.timeSetAdd = setInterval(function() {
      //只能有一个定时器

      if (++second >= 3) {
        console.log('send');
        that.sendShopppingCart(id,num);
        //成了以后清除定时器
        clearInterval(that.data.timeSetAdd);
        // 重新赋值
        second = 0;
      }
      console.log(second);
    }, 1000);
  },
  /**
   * 发送更新购物车请求
   * id: 商品id
   * num: 商品数量
   */
  sendShopppingCart:function(id,num){
    console.log('num:' +num);
    wx.request({
      url: app.globalData.url + '/api/productCart/updateProductCart?sid=' + app.globalData.sid + "&productCartId=" + id+ '&num=' + num,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.productList;
    //获取对应的ID
    var values = e.detail.value;
    console.log('values:'+values);
    console.log('选取了ID为' + e.detail.value + '的商品');
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].productId == values[j]) {
          checkboxItems[i].checked = true;
          console.log('============================');
          break;
        }
      }
    }
    //若点此按钮商品全选了，则把全选按钮点亮
    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }
    this.setData({
      'productList': checkboxItems,
      'checkAll': checkAll
    });
    this.calculateTotal();
  },
  /**
   * 用户点击全选
   */
  checkAll: function(e) {
    console.log('用户点击全选，携带value值为：', e.detail.value);
    //e.detail.value;
    var value = e.detail.value;
    var checkAll = false;
    //全选按钮选中，e.detail.value[0]等于'all'，不为空，则把checkALl变为true，如果取消全选则value[0]为空,checkAll为最初设置的false
    if (value[0]) {
      checkAll = true;
    }
    var productList = this.data.productList;
    for (var i = 0; i < productList.length; i++) {
      productList[i].checked = checkAll;
    }
    this.setData({
      'checkAll': checkAll,
      'productList': productList
    });
    //结算金额
    this.calculateTotal();
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },

  /*
  /删除购物车商品
  */
  delete: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除该商品吗？',
      confirmColor: '#f53f2c',
      success: function(res) {
        if (res.confirm) {
          //获取商品
          var productList = that.data.productList;
          var ids = "";
          // for循环找到选中的商品并将其从数组删掉
          for (var i = 0; i < productList.length; i++) {
            if (productList[i].checked == true) {
              ids += productList[i].cartId + ",";
              productList.splice(i, 1);
            }
          }
          wx.request({
            url: app.globalData.url + '/api/productCart/removeFromProductCart?sid=' + app.globalData.sid + "&productCartIds=" + ids,
            method: "POST",
            header: {
              'X-Requested-With': 'APP'
            },
            success: function(res) {
              console.log(res);
            }
          })
          that.setData({
            'productList': productList
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})