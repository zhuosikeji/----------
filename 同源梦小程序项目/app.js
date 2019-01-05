//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          // 这里的 url 是微信官方提供的可以在小程序中直接通过 code 来获取 openid 的
          // 根据解释，补上自己的 APPID 和 SECRET
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe8745930c28b88f9&secret=1052fc3489e418532bae50327887ad47&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
            that.globalData.openid = res.data.openid;
          }
        })
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    url: "http://localhost:8080",
    userInfo: null,
    sid:null,
    uid:'',
    firstClassifyList:""
  }
})