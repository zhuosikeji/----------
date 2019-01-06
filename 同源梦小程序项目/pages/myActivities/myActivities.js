var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitiesList: [
      // {
      //   coverPath: 'http://47.107.94.80/box1.jpg',
      //   productTitle:"拓展活动项目2013深圳亲子活动方案",
      //   activitiPlace:"地点：深圳南山科兴科学园B2栋16楼",
      //   beginTime: 2018 - 12 - 13,
      //   endTime: 2018 - 12 - 20,
      //   price:98,
      // },
      // {
      //   coverPath: 'http://47.107.94.80/box4.jpg',
      //   productTitle: "拓展活动项目2013深圳亲子活动方案",
      //   activitiPlace: "地点：深圳南山科兴科学园B2栋16楼",
      //   beginTime: 2018 - 12 - 13,
      //   endTime: 2018 - 12 - 20,
      //   price: 98,
      // },
      // {
      //   coverPath: 'http://47.107.94.80/box3.jpg',
      //   productTitle: "拓展活动项目2013深圳亲子活动方案",
      //   activitiPlace: "地点：深圳南山科兴科学园B2栋16楼",
      //   beginTime: 2018 - 12 - 13,
      //   endTime: 2018 - 12 - 20,
      //   price: 98,
      // },
    ],
  },

  getMyActivities: function() {
    var that = this;
    //data对象中的活动列表
    var activitiesList = that.data.activitiesList;
    wx.request({
      url: app.globalData.url + '/api/activities/getAllByUserId?&sid=' + app.globalData.sid + '&userId=' + app.globalData.uid ,
      header: {
        'X-Requested-With': 'APP'
      },
      method: 'POST',
      success: function(res) {
        //从后台获取的数据
        var TotalList = res.data.data.activitiesVOS;
        //中间变量，用于将后台变量放到data中的list中
        var activeList = new Array(TotalList.length);


        for (var i = 0; i < TotalList.length; i++) {
          var activeObj = {
            productId: "",
            coverPath: "",
            productTitle: "",
            activitiPlace: "",
            showColor:"#ff0000",
            beginTime: "",
            endTime: "",
            price: 0,
          };

          activeObj.coverPath = TotalList[i].coverPath;
          activeObj.productTitle = TotalList[i].productTitle;
          activeObj.activitiPlace = TotalList[i].activitiPlace;
          activeObj.beginTime = that.dateSplite(TotalList[i].beginTime);
          activeObj.endTime = that.dateSplite(TotalList[i].endTime);
          activeObj.price = TotalList[i].price;
          if(activeObj.price == 0){
            activeObj.showColor = "#F9A505";
          }
          activeObj.productId = TotalList[i].productId;
          activeList[i] = activeObj;
        }

        activitiesList = activeList;
        that.setData({
          'activitiesList': activitiesList,
          'TotalList': TotalList
        })
      }

    })

  },

  // 跳转活动详情页面
  activeDetail: function(e) {
    console.log(e);
    var index = JSON.stringify(e.currentTarget.dataset.index);
    var TotalList = this.data.TotalList;
    wx.navigateTo({
      url: '../eventDetails/eventDetails?activeDetail=' + JSON.stringify(TotalList[index]),
    })
  },

  // 格式化日期
  dateSplite: function(date) {
    date = date.substring(0, 10);
    return date;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyActivities();
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

  /*
  / 清空搜索内容
  */
  deleteSearch: function() {
    this.setData({
      'searchinput': ""
    });
  }

})