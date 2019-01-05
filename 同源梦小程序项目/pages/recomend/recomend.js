var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  directfan: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/personalCenter/getFansRecord?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        that.setData({
          refereesUserNickName: res.data.data.fansVO.refereesUser.nickName,
          firstFansVOList: res.data.data.fansVO.firstFansVOList
        })
  
      }
    })

  },

  secfan: function() {
    wx.navigateTo({
      url: '../secfan/secfan?firfan=' + JSON.stringify(this.data.firstFansVOList)
    })
  },
  perdata: function() {
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.directfan();
    this.perdata();
    console.log("用户id:");
    console.log(app.globalData.uid);
    
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