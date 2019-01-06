var app = getApp();
Page({

  data: {
    imgUrls: [
      '../image/book.jpg',
      '../image/book2.jpg',
      '../image/book3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goods: {
      productTitle: "那莲  那禅 那光阴",
      memberPrice: "66",
      originalPrice: "128",
      productSales: "96969",
    },
    appraiseInfo: {
      name: "墨刀用户",
      info: "书本不错 ，包装很好，没有破损 ，快递很快。翻了一下，字体打印很清楚。"
    },
    appraiseList: [{
        appraise: "不错",
        count: 12,
      },
      {
        appraise: "追加",
        count: 12,
      },
      {
        appraise: "有图",
        count: 12,
      },
      {
        appraise: "物流快",
        count: 12,
      },
      {
        appraise: "很划算",
        count: 12,
      },
      {
        appraise: "质量好",
        count: 12,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var productInfo = JSON.parse(options.productInfo);
    console.log(productInfo);
    this.setData({
      'goods': productInfo
    })
    this.getProductPicture();
  },
  /**
   * 请求商品配图
   */
  getProductPicture: function() {
    var that = this;
    console.log('首页sid' + app.globalData.sid);
    wx.request({
      url: app.globalData.url + '/api/product/getProductPicture?sid=' + app.globalData.sid + "&id=" + that.data.goods.id,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res.data.data.hcProductPictureList);
        var imgUrls = that.data.imgUrls;
        for (var i = 0; i < res.data.data.hcProductPictureList.length; i++) {
          imgUrls[i] = app.globalData.url+':80/common/file/showPicture.do?id=' + res.data.data.hcProductPictureList[i].productImgPath;
        }
        that.setData({
          'imgUrls': imgUrls
        })
      }
    })
  },

  /**
   * 加入购物车
   */
  JoinShoppingCart: function(){
    var that = this;
    wx.showModal({
      title: '成功添加购物车！！！',
      content: '可在购物车中修改商品数量！',
      showCancel: false,
      confirmText: '返回',
      success: function (res) {
        if (res.confirm) {
          //商品添加购物车接口
          var id = that.data.goods.id;
          console.log("id:" + id);
          console.log("userId:" + app.globalData.uid);
          wx.request({
            url: app.globalData.url + '/api/productCart/addToProductCart?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid + "&productId=" + id,
            method: "POST",
            header: {
              'X-Requested-With': 'APP'
            },
            success: function (res) {
              console.log(res);
              console.log('url:' + app.globalData.url + '/api/productCart/addToProductCart?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid + "&productId=" + id);
            }
          })
        }
      }
    })
  }

})