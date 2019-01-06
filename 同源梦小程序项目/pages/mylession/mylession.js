var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoles: false,
    musicles: true,
    autoplay: true,
    interval: 2000,
    videoList: [],
    audioList: [],
    productType: []
  },
  onloadmylesson: function() {
    var that = this;
    wx.request({ 
      url: app.globalData.url + '/api/personalCenter/getAllCourse?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log("res");
        console.log(res.data);
        that.setData({
          hcProductInfoList: res.data.data.hcProductInfoList
        })
        wx.request({
          url: app.globalData.url + '/api/personalCenter/getAllCourse?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
          method: "POST",
          header: {
            'X-Requested-With': 'APP'
          },
          success: function(res1) {
            console.log('用户课程返回结果：');
            console.log(res1)
            that.setData({
              productType: res1.data.data.hcProductInfoList
            })
            var productType = res1.data.data.hcProductInfoList;
            console.log(app.globalData.firstClassifyList);
            var videoList = [];
            var audioList = [];
            for (var i = 0; i < that.data.productType.length; i++) {
              if (that.data.productType[i].firstClassifyId
 == app.globalData.firstClassifyList[2].id) {
                //视频
                videoList.push(productType[i]);

              } else if (that.data.productType[i].firstClassifyId == app.globalData.firstClassifyList[1].id) {
                //声音
                audioList.push(productType[i]);
              }
            }
            that.setData({
              'videoList': videoList,
              'audioList': audioList
            })
          }

        })
      }
    })
  },
  onLoad: function() {
    this.onloadmylesson();
    console.log('===================firstClassifyList');
    console.log(app.globalData.firstClassifyList);
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
    })
  },
  musicles: function() {
    //有返回
    this.setData({
      videoles: true,
      musicles: false,
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  }
})