Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitiesList:[
      {
        coverPath: 'http://47.107.94.80/box1.jpg',
        productTitle:"拓展活动项目2013深圳亲子活动方案",
        activitiPlace:"地点：深圳南山科兴科学园B2栋16楼",
        beginTime: 2018 - 12 - 13,
        endTime: 2018 - 12 - 20,
        price:98,
      },
      {
        coverPath: 'http://47.107.94.80/box4.jpg',
        productTitle: "拓展活动项目2013深圳亲子活动方案",
        activitiPlace: "地点：深圳南山科兴科学园B2栋16楼",
        beginTime: 2018 - 12 - 13,
        endTime: 2018 - 12 - 20,
        price: 98,
      },
      {
        coverPath: 'http://47.107.94.80/box3.jpg',
        productTitle: "拓展活动项目2013深圳亲子活动方案",
        activitiPlace: "地点：深圳南山科兴科学园B2栋16楼",
        beginTime: 2018 - 12 - 13,
        endTime: 2018 - 12 - 20,
        price: 98,
      },
    ],
  
    show: false,
    money: "￥99",
    free: "免费"
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /*
  / 清空搜索内容
  */
  deleteSearch: function () {
    this.setData({
      'searchinput': ""
    });
  }

})