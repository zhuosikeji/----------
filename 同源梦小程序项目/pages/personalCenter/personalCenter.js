//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    user: {
      userImg: 'http://47.107.183.112/img/userImg.jpg',
      userName: "南墙在哪",
      member: false
    }
    
  },
  
  onLoad: function () {
    wx.request({
      url: app.globalData.url + '/api/personalCenter/checkAuthentication?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success(res) {
        console.log(res);
        console.log(res.data.data.isAuthentication)
        if (!res.data.data.isAuthentication) {
          wx.showModal({
            title: '提示',
            showCancel: true,
            content: '请绑定手机号',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  
                  url: '../authentication/authentication',
                });
              }
            }
          })
        }
      }
    })
  }
})
