Page({

  /**
   * 页面的初始数据
   */
  data: {
    vritualCourse: {
      coverPath: 'http://47.107.94.80/virtual8.jpg',
      productTitle: "Java入门第一季",
      productAuthor: "张三老师",
      totalNum: 13,
      nowNum: 7,
      price: 299,
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1200
    })
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
  }
})