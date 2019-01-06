var app = getApp();
Page({
  data: {
    address: {
      username: "",
      telephone: "",
      address: "没有收货地址，请点击左边链接添加！",
      id: ""
    },
    goodsList: [{
      productName: "线性代数",
      oldprice: "66.00",
      productImage: "../image/math.jpg",
      count: 1,
      price: 0
    }, {
      productName: "线性代数",
      oldprice: "66.00",
      productImage: "../image/math.jpg",
      count: 1,
      price: 0
    }],
    delivery: {
      discount: 0.8,
      integral: "2000"
    },
    inputValue: "",
    coupon: [{
        money: "40",
        dikou: "抵用券",
        name: "通用",
        manjian: "290",
        use: "立即选择",
        check: false
      },
      {
        money: "40",
        dikou: "抵用券",
        name: "通用",
        manjian: "290",
        use: "立即选择",
        check: false
      }
    ],
    integral: 0,
    TotalPrice: 0,
    TotalCount: 0
  },
  pay: function() {
    //TODO 支付
    var that = this
    //支付成功存储订单
    this.createOrder();
    wx.navigateTo({
      url: '../pay/pay?TotalPrice=' + that.data.TotalPrice,
    })
  },
  /**
   * 选择优惠券
   */
  chooseCoupon: function(e) {
    //拿选择的索引
    var index = e.currentTarget.dataset.index;
    //拿到优惠券
    var coupon = this.data.coupon;

  
    if (!coupon[index].check) {
      if(this.data.TotalPrice >= coupon.manjian){
      for (let i; i < coupon.length; i++) {
        coupon[index].check = false;
      }
      coupon[index].check = true;
      coupon[index].use = '已选择';
    } else{
        wx.showToast({
          title: '未达到满足条件',
          icon: 'none',
          duration: 2000
        })
    }
    } else {
      coupon[index].check = false;
      coupon[index].use = '立即选择';
    }
    this.setData({
      'coupon': coupon
    })
  },
  onLoad: function(options) {
    //拿到订单数据
    this.setData({
      'goodsList': app.globalData.productCartList
    })
    //拿到可用优惠券
    this.showCoupon();
    this.getAddress();
    this.getWallet();
  },
  /**
   * 获取积分总额
   */
  getWallet: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/personalCenter/getWallet?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        var integral = 0;
        if (res.data.data.hcWallet.integral) {
          integral = res.data.data.hcWallet.integral;
        }
        that.setData({
          'integral': integral
        })
        setTimeout(function() {
          that.TotalPrice();
        }, 2000);

      }
    })
  },
  /**
   * 查询优惠券
   */
  showCoupon: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/coupon/showCoupon?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        var couponVOS = res.data.data.couponVOS;
        var couponList = [];
        for (let i = 0; i < couponVOS.length; i++) {
          var coupon = {
            money: "40",
            dikou: "抵用券",
            name: "通用",
            manjian: "满300减20",
            use: "立即选择",
            check: false,
            couponId: ""
          };
          coupon.money = couponVOS[i].preferentialAmount;
          coupon.couponId = couponVOS[i].id;
          switch (couponVOS[i].usableRange) {
            case 0:
              coupon.name = "通用";
              break;
            case 1:
              coupon.name = "实体商品 ";
              break;
            case 2:
              coupon.name = "声音课程";
              break;
            case 3:
              coupon.name = "视频课程";
              break;
            case 4:
              coupon.name = "活动";
              break;
          }
          if (couponVOS[i].couponsTypes == 2) {
            coupon.dikou = "折扣";
          }
          coupon.manjian = couponVOS[i].name;
          couponList[i] = coupon;
        }
        that.setData({
          'coupon': couponList
        })

      }
    })
  },
  /**
   * 计算总金额和总数量
   */
  TotalPrice: function() {
    var goodsList = this.data.goodsList;
    var TotalPrice = 0;
    var TotalCount = 0;
    var coupon = this.data.coupon;
    for (let i = 0; i < goodsList.length; i++) {
      TotalPrice += goodsList[i].count * goodsList[i].price;
      console.log('goodsList[i].count:' + goodsList[i].count);
      console.log('goodsList[i].price:' + goodsList[i].price);
      TotalCount += goodsList[i].count
    }
    var couponMoney = 0;
    console.log("1:" + TotalPrice);
    for (let i = 0; i < coupon.length; i++){
      if (coupon[i].check == true){
        couponMoney = parseFloat(coupon[i].money);
      }
    }

    TotalPrice -= couponMoney;
    TotalPrice -= (this.data.integral / 1000)
    TotalPrice *= this.data.delivery.discount;
    
    this.setData({
      'TotalPrice': TotalPrice.toFixed(2),
      'TotalCount': TotalCount
    })
  },

  /**
   * 存储订单到数据库
   */
  createOrder: function() {
    var hcOrderItemList = Array(this.data.goodsList.length);
    var goodsList = this.data.goodsList;
    for (var i = 0; i < goodsList.length; i++) {
      var OrderItem = new Object();
      OrderItem.product_id = goodsList[i].productId;
      OrderItem.shop_number = goodsList[i].count;
      hcOrderItemList[i] = OrderItem;
    }
    var thisCouponId = null;
    for (let i = 0; i < this.data.coupon.length; i++) {
      if (this.data.coupon[i].check == true) {
        console.log(this.data.coupon[i]);
        thisCouponId = this.data.coupon[i].couponId;
      }
    }
    console.log(this.data.address.id);
    var hcOrder = new Object();
    hcOrder.user_id = app.globalData.uid;
    hcOrder.coupon_id = thisCouponId;
    hcOrder.address_id = this.data.address.id;
    hcOrder.integral = this.data.integral;
    hcOrder.information = this.data.inputValue;
    hcOrder.payment_way = 1;
    hcOrder.freight = 0;
    hcOrder.actualPayment = 232323;
    hcOrder.allPayment = 1;
    var json = new Object();
    json.hcOrder = hcOrder;
    json.hcOrderItemList = hcOrderItemList;
    json.userId = app.globalData.uid;
    console.log('JSON:');
    console.log(json);
    console.log(JSON.stringify(json))
    wx.request({
      url: app.globalData.url + '/api/order/createOrder?sid=' + app.globalData.sid,
      method: "POST",
      data:  json,
      header: {
        'X-Requested-With': 'APP',
      },
      success: function(res) {
        console.log("创建订单结果：")
        console.log(res);
      }
    })
  },
  /**
   * 获取用户地址
   */
  getAddress: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/userAddress/getAddress?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        var address = that.data.address;
        var hcUserAddressList = res.data.data.hcUserAddressList;
        //没有收货就选择默认值
        if (hcUserAddressList.length == 0) {
          return;
        }
        for (let i = 0; i < hcUserAddressList.length; i++) {
          if (hcUserAddressList[i].isDefault == true) {
            address.username = hcUserAddressList[i].userName;
            address.telephone = hcUserAddressList[i].userPhone;
            address.address = hcUserAddressList[i].userAddress;
            address.id = hcUserAddressList[i].id;
          }
        }
        that.setData({
          'address': address
        })
      }
    })
  },


  /**
   * 获取买家留言
   */
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  address: function() {
    wx.navigateTo({
      url: '../address/address',
    })
  }


})