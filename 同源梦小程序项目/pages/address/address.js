var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      distance:1032,
      address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getAddress();
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

  addAddress:function(){
      wx:wx.navigateTo({
        url: '../addAddress/addAddress',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  },
  getAddress: function () {
    var that = this;
    console.log(app.globalData.uid);
    wx.request({
      url: app.globalData.url + '/api/userAddress/getAddress?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
        var address = "";
        var addressList = res.data.data.hcUserAddressList;
        for (var i = 0; i < addressList.length;i++){
          if(addressList[i].isDefault){
            address = addressList[i].userAddress;
          }
        }
        that.setData({
          'addressList': addressList,
          'address': address,
        });
      }
    })
  },
  
})