var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallet: {
      money: '',
      imagePath: [
        "../image/Dollar.svg",
        "../image/card.svg",
        "../image/right.svg"
      ]
    },
    walletList: [{
        name: "我的银行卡",
        imagePath: "../image/right.svg",
        add: "未添加",
        id: 1
      },
      {
        name: "微信支付",
        imagePath: "../image/right.svg",
        add: "已添加",
        id: 2
      },
      {
        name: "第三方支付",
        imagePath: "../image/right.svg",
        add: "已添加",
        id: 3
      }
    ]
  },
  /**
   * 跳转绑定银行卡
   */
  ToBindbankcards: function() {
    wx: wx.navigateTo({
      url: '../bindbankcards/bindbankcards',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  recharge: function() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  cash: function() {
    wx.navigateTo({
      url: '../cash/cash',
    })
  },
  account: function() {
    wx.navigateTo({
      url: '../account/account',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
          that.getWallet();
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

  getWallet: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/personalCenter/getWallet?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        var wallet = that.data.wallet;
        var money = res.data.data.hcWallet.balance;
        wallet.money = money;
        that.setData({
          'money': money,
          'wallet': wallet
        });
      }
    })
  },
})