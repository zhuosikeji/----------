var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoles: false,
    musicles: true,
    // backcolor:"#eee",
    // backcolorff: "#fff",
    autoplay: true,
    interval: 2000,
    videoList: [{
        videoName: '数据结构视频',
        author: '张三老师',
        buyNumber: 1456
      },
      {
        videoName: '数据结构视频',
        author: '张三老师',
        buyNumber: 1456
      }
    ],
    audioList: [{
        audioName: '数据结构视频',
        author: '张三老师',
        buyNumber: 1456
      },
      {
        audioName: '数据结构视频',
        author: '张三老师',
        buyNumber: 1456
      }
    ]
  },
  onLoad: function() {
    this.getAllCourse();
  },


  /**
   * 获取用户购买的视频
   */
  getAllCourse: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/personalCenter/getAllCourse?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        var ProductInfoList = res.data.data.hcProductInfoList;
        var videoList = that.data.videoList;
        var audioList = that.data.audioList;
        let x=0,y=0;
        console.log(app.globalData.firstClassifyList);
        console.log(ProductInfoList);
        for (let i = 0; i < ProductInfoList.length; i++){
          //声音课程
          if (ProductInfoList[i].firstClassifyId==app.globalData.firstClassifyList[1].id){
            audioList[x].audioName = ProductInfoList[i].productTitle;
            audioList[x].author = ProductInfoList[i].productAuthor;
            audioList[x++].buyNumber = ProductInfoList[i].productSales;
          }
          //视频课程
          if (ProductInfoList[i].firstClassifyId == app.globalData.firstClassifyList[2].id){
            videoList[y].videoName = ProductInfoList[i].productTitle;
            videoList[y].author = ProductInfoList[i].productAuthor;
            videoList[y++].buyNumber = ProductInfoList[i].productSales;
          }
        }
        that.setData({
          'audioList': audioList,
          'videoList': videoList
        })
        
      }
    })
  },
  /**
   * 跳转到音频播放
   */
  ToAudioPlay: function() {
    wx: wx.navigateTo({
      url: '../audioPlay/audioPlay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 跳转到视频播放
   */
  ToVideoPlay: function() {
    wx: wx.navigateTo({
      url: '../videoPlay/videoPlay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  videoles: function() {
    this.setData({
      musicles: true,
      videoles: false,
      // backcolor: "#eee",
      // backcolorff: "#fff"
    })
    // wx.redirectTo({
    //   url: '',
    // })
  },
  musicles: function() {
    //有返回
    this.setData({
      videoles: true,
      musicles: false,
      // backcolor: "#fff",
      // backcolorff: "#eee"
    })
    // wx.redirectTo({
    //   url: '',
    // })
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

  }
})