var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 获得粉丝数据
  fensdata: function(a) {
    var that = this;
    that.setData({
      firstFansVOList: a
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fensdata(JSON.parse(options.firfan));

  }
})