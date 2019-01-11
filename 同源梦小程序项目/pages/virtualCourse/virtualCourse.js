var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vritualCourse: {
      id:'',
      coverPath: '',
      productTitle: "",
      productAuthor: "",
      totalNum: '',
      nowNum:'',
      productSales:'',
      productStock:'',
      price: '',
      memberPrice:'',
      courseIntroduce: "本教程为Java入门第一季，欢迎来到精彩的Java编程世界！Java语言已经成为当前软件开发行业中主流的开发语言。本教程将介绍Java环境搭建、工具使用、基础语法。带领大家一步一步的踏入Java达人殿堂！Let’s go!",
    },
    courseList: [{
        chapterName: "1.  java基础-常用dos命令  环境变量的配置",
        isCharge: false,
      },
      {
        chapterName: "1.  java基础-常用dos命令  环境变量的配置",
        isCharge: true,
      },
      {
        chapterName: "1.  java基础-常用dos命令  环境变量的配置",
        isCharge: true,
      },
      {
        chapterName: "1.  java基础-常用dos命令  环境变量的配置",
        isCharge: true,
      },
    ],
    hidden: false,
    nocancel: false,
    isFolded: true,
    isClick: false,
    addCar: false,
    show: false,
    rows: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    var json = JSON.parse(options.productInfo);
    console.log(json);
    this.setData({
      'json':json
    })
    var vritualCourse = this.data.vritualCourse;
    vritualCourse.id = json.id;
    vritualCourse.coverPath = app.globalData.url +'/common/file/showPicture.do?id='+  json.productCovermap;
    vritualCourse.productTitle = json.productTitle;
    vritualCourse.productAuthor = json.productAuthor;
    vritualCourse.price = json.originalPrice;
    vritualCourse.memberPrice = json.memberPrice;
    vritualCourse.productSales = json.productSales;
    vritualCourse.productStock = json.productStock;
    vritualCourse.courseIntroduce = json.courseIntroduce;

    this.setData({
      'vritualCourse': vritualCourse
    })
   
    this.getCourseInfo();
    // this.checkCourse();
  },
  /**
   * 跳转购买
   */
  addBuy:function(){
    wx.navigateTo({
      url: '../confirm/confirm?productInfo=' + JSON.stringify(this.data.json)+'&type=goods',
    })
  },
  change: function(e) {
    if (this.data.isFolded) {
      this.setData({
        isFolded: false,
        rows: 5000
      });
    } else {
      this.setData({
        isFolded: true,
        rows: 4
      });
    }
  },

  bounced: function() {
    if (this.data.show) {
      this.setData({
        show: false
      })
      console.log(this.data.show)
    } else {
      this.setData({
        show: true
      })
      console.log(this.data.show)
    }
  },

  addCollection: function() {
    if (!this.data.isClick == true) {
      wx.showToast({
        title: '已收藏',
      });
      app.collectionProduct(app.globalData.uid,this.data.vritualCourse.id);
    } else {
      wx.showToast({
        title: '已取消收藏',
      });
    }
    this.setData({
      isClick: !this.data.isClick
    })
  },
  // 加入购物车
  addCar: function() {
    this.JoinShoppingCart();
  },

  bounced: function(e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.courseList[index].isCharge == true) {
      wx.showModal({
        title: '收费课程',
        content: '请您购买',
        showCancel: false,
        confirmText: '取消',
      })
    } else{
      wx:wx.navigateTo({
        url: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
 
/**列表数据表交互*/
  getCourseInfo: function () {
    var that = this;
    var id = this.data.vritualCourse.id;
    var vritualCourse = this.data.vritualCourse;
    console.log("id:"+id);
    wx.request({
      url: app.globalData.url + '/api/course/getCourseInfo?sid=' + app.globalData.sid + '&id=' + id ,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
        var course = res.data.data.courseVO;
        var courseList = res.data.data.courseVO.hcFSectionInfoList;

        vritualCourse.totalNum = course.totalNum
        vritualCourse.nowNum = course.nowNum
    
        that.setData({
          'vritualCourse': vritualCourse,
          'courseList': courseList
        });
      }
    })
  },

  /**判断用户是否购买交互 */
  checkCourse: function () {
    var that = this;
    var id = this.data.vritualCourse.id;
    var number = that.data.vritualCourse
    wx.request({
      url: app.globalData.url + '/api/course/checkCourse?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid + '&productId=' +id,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      // success: function (res) {
      //   console.log(res);
      //   that.setData({
      //     'number': number,
      //   });
      // }
    })
  },
  /**
   * 加入购物车到数据库
   */
  JoinShoppingCart: function () {
    var that = this;
    wx.showModal({
      title: '成功添加购物车！！！',
      content: '可在购物车中修改商品数量！',
      showCancel: false,
      confirmText: '返回',
      success: function (res) {
        if (res.confirm) {
          //商品添加购物车接口
          var id = that.data.vritualCourse.id;
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
  },
  /**判断视屏与音频交互*/
})

