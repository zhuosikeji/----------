var app = getApp();
Page({
  data: {
    imgUrls: [
      'http://47.107.183.112/img/carouse1.jpg',
      'http://47.107.183.112/img/carouse2.jpg',
      'http://47.107.183.112/img/carouse3.jpg',
      'http://47.107.183.112/img/carouse4.jpg'
    ],
    // 一级分类
    firstClassifyList: [

    ],
    //商品集合：实体商品
    BookItem: [{
      content: "成为母亲", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/product_img.jpg", //图片URL
      ProductId: "542asfd314sa" //产品ID，传参用
    }, {
      content: "成为母亲", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/product_img.jpg", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "成为母亲", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/product_img.jpg", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "成为母亲", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/product_img.jpg", //图片URL
      ProductId: "" //产品ID，传参用
    }],
    //商品集合：音频商品
    AudioItem: [{
      content: "王东岳的中西哲学启蒙课", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/audio.jpg", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "王东岳的中西哲学启蒙课", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/audio.jpg", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "王东岳的中西哲学启蒙课", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/audio.jpg", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "王东岳的中西哲学启蒙课", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/audio.jpg", //图片URL
      ProductId: "" //产品ID，传参用
    }],
    //商品集合：视频商品
    VideoItem: [{
      content: "西方经济学（微观）", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/video.png", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "西方经济学（微观）", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/video.png", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "西方经济学（微观）", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/video.png", //图片URL
      ProductId: "" //产品ID，传参用
    }, {
      content: "西方经济学（微观）", //标题
      buyNumber: "332", //购买人数
      price: "66.00", //价格
      ProductImgUrl: "http://47.107.183.112/img/video.png", //图片URL
      ProductId: "" //产品ID，传参用
    }],
    //轮播图是否显示面板指示点
    indicatorDots: true,
    //指示点颜色
    indicatorColor: 'rgb(f,f,f,1)',
    //当前选中的指示点颜色
    indicatorActiveColor: '#F53F2C',
    //是否自动播放
    autoplay: true,
    //是否采用衔接滑动
    circular: true,
    //自动切换时长
    interval: 3000,
    //切换动画时长
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    searchinput: "",
  },
  onLoad: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log('用户已经授权过');
              if (app.globalData.sid == null) {
                that.login();
              } else {
                that.requestCarousel();
                that.getAllProductFirstClassify();
              }
            }
          });


        } else {
          wx.redirectTo({
            url: '../login/login'
          })
        }
      }
    })
  },
  login: function(e) {
    var that = this;
    wx.login({
      success: function(res) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        console.log('loginCode:' + res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: getApp().globalData.url + '/api/hcAppLogin/login?code=' + res.code,
            header: {
              'X-Requested-With': 'APP'
            },
            method: "POST",
            success: function(res) {
              console.log(res);
              app.globalData.sid = res.data.data.sid;
              app.globalData.uid = res.data.data.uid;
              console.log(getApp());
              //再次请求轮播图和一级分类
              that.requestCarousel();
              that.getAllProductFirstClassify();
              wx.hideLoading();
            },
            fail: function(res) {
              // wx.showModal({
              //   title: '错误',
              //   content: '服务器出错!请稍后重试!',
              //   showCancel: false,
              //   confirmText: '返回授权',
              //   success: function (res) {
              //     if (res.confirm) {
              //       console.log('用户点击了“返回授权”')
              //     }
              //   }
              // })
              console.log('服务器请求失败');
            }
          })
        }
      },
      fail: function(res) {

      }
    })
  },
  /**
   * 根据一级ID查询所有推荐商品
   */
  getRecommend: function() {
    var that = this;
    var BookItem = that.data.BookItem;
    var AudioItem = that.data.AudioItem;
    var VideoItem = that.data.VideoItem;
    var x = 0,
      y = 0,
      z = 0;
    var firstClassifyList = this.data.firstClassifyList;
    var ids = "";
    var TotalList = null;
    for (let i = 0; i < firstClassifyList.length; i++) {
      if (i != firstClassifyList.length - 1) {
        ids += firstClassifyList[i] + ",";
      } else {
        ids += firstClassifyList[i];
      }
    }
    console.log(ids);
    console.log('首页sid' + app.globalData.sid);
    wx.request({
      url: app.globalData.url + '/api/product/getRecommend?sid=' + app.globalData.sid + '&firstClassifyIds=' + ids + '&size=4',
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        //获取总data
        TotalList = res.data.data.hcProductInfoList;
        for (var i = 0; i < TotalList.length; i++) {
          if (TotalList[i].firstClassifyId == firstClassifyList[0]) {

            BookItem[x].content = TotalList[i].productTitle;
            BookItem[x].buyNumber = TotalList[i].productSales;
            BookItem[x].price = TotalList[i].originalPrice;
            BookItem[x].ProductImgUrl = TotalList[i].productCovermap;
            BookItem[x++].ProductId = TotalList[i].id;
          }
          if (TotalList[i].firstClassifyId == firstClassifyList[1]) {
            AudioItem[y].content = TotalList[i].productTitle;
            AudioItem[y].buyNumber = TotalList[i].productSales;
            AudioItem[y].price = TotalList[i].originalPrice;
            AudioItem[y].ProductImgUrl = TotalList[i].productCovermap;
            AudioItem[y++].ProductId = TotalList[i].id;
          }
          if (TotalList[i].firstClassifyId == firstClassifyList[2]) {
            VideoItem[z].content = TotalList[i].productTitle;
            VideoItem[z].buyNumber = TotalList[i].productSales;
            VideoItem[z].price = TotalList[i].originalPrice;
            VideoItem[z].ProductImgUrl = TotalList[i].productCovermap;
            VideoItem[z++].ProductId = TotalList[i].id;
          }
        }
        that.setData({
          'BookItem': BookItem,
          'AudioItem': AudioItem,
          'VideoItem': VideoItem,
          'TotalList': TotalList
        })
      }

    })


  },



  /**
   * 查询所有一级分类
   */
  getAllProductFirstClassify: function() {
    var that = this;
    console.log('首页sid' + app.globalData.sid);
    wx.request({
      url: app.globalData.url + '/api/product/getAllProductFirstClassify?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        var firstClassifyList = that.data.firstClassifyList;
        var FromList = res.data.data.hcProductFirstClassifyList;
        app.globalData.firstClassifyList = FromList;
        for (var i = 0; i < FromList.length - 1; i++) {
          firstClassifyList[i] = FromList[i].id;
        }
        that.setData({
          'firstClassifyList': firstClassifyList
        });
        that.getRecommend();
      }
    })
  },
  /**
   * 轮播图
   */
  requestCarousel: function() {
    var that = this;
    console.log('首页sid' + app.globalData.sid);
    wx.request({
      url: app.globalData.url + '/api/carousel/getAll?sid=' + app.globalData.sid+"&size=4",
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log('轮播图：');
        console.log(res);
        var imgUrls = [];
        var carouselList = res.data.data.carouselList;
        for (let i = 0; i < carouselList.length; i++){
          imgUrls[i] = carouselList[i].path;
        }
        that.setData({
          'imgUrls': imgUrls
        })
      }
    })
    console.log('sid:' + app.globalData.sid);
  },
  /*
  / 清空搜索内容
  */
  deleteSearch: function() {
    this.setData({
      'searchinput': ""
    });
  },
  /*
  / 轮播图方法
  */
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /*
  / 搜索框页面跳转
  */
  query: function(e) {
    var searchinput = e.detail.value;
    wx: wx.navigateTo({
      url: "../searchPage/searchPage?key=" + searchinput,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 跳转商品详情
   */
  ToGoods: function(e) {
    var index = e.currentTarget.dataset.index;
    var firstClassify = e.currentTarget.dataset.fristclassify;
    var TotalList = this.data.TotalList;
    var TotalIndex = "";
    if (firstClassify == 'BookItem') {
      TotalIndex = index;
    } else if (firstClassify == 'AudioItem') {
      TotalIndex = index + 4;
    } else if (firstClassify == 'VideoItem') {
      TotalIndex = index + 8;
    }
    var productInfo = JSON.stringify(TotalList[TotalIndex])
    wx: wx.navigateTo({
      url: '../goods/goods?productInfo=' + productInfo,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})