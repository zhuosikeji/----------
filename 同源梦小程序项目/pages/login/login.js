var app = getApp();
Page({
      data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      },
      onLoad: function() {

      },
      login: function(e) {
        var that = this;
        wx.login({
          success: function(res) {
            wx.showLoading({
              title: '加载中',
              mask: true
            })
            console.log('loginCode:' + res.code);
            if (res.code) {
              //发起网络请求
              wx.request({
                url: getApp().globalData.url + '/api/hcAppLogin/login?code=' + res.code,
                header: {
                  'X-Requested-With': 'APP'
                },
                method: "POST",
                success: function(res) {
                  console.log(res);
                  getApp().globalData.sid = res.data.data.sid;
                  getApp().globalData.uid = res.data.data.uid;
                  console.log('APP：')
                  console.log(getApp());

                  //获取userInfo
                  that.getUserInfo();
                  wx.hideLoading();
                  wx.switchTab({
                    url: '../index/index'
                  })
                },
                fail: function(res) {
                  wx.showModal({
                    title: '错误',
                    content: '服务器出错!请稍后重试!',
                    showCancel: false,
                    confirmText: '返回授权',
                    success: function(res) {
                      if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                      }
                    }
                  })
                  console.log('服务器请求失败');
                }
              })
            }
          },
          fail: function(res) {

          }
        })
      },
      /**
       * 存储个人信息
       */
  updateUserAppInfo : function(){
          var that = this;
          wx.request({
            url: getApp().globalData.url + '/api/personalCenter/updateUserAppInfo?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid + '&img=' + app.globalData.userInfo.avatarUrl + "&nickname=" + app.globalData.userInfo.nickName,
            header: {
              'X-Requested-With': 'APP'
            },
            method: "POST",
            success: function(res) {
              console.log('存储结果');
              console.log(res);
            }
          })
        },
      
        /**
         * 获取用户信息
         */
        getUserInfo: function() {
          var that = this
          _getUserInfo();

          function _getUserInfo() {
            wx.getUserInfo({
              success: function(res) {
                app.globalData.userInfo = res.userInfo;
                console.log('=====================');
                console.log(app.globalData.userInfo);
                that.updateUserAppInfo();
              }
            })
          }
        },
        bindGetUserInfo: function(e) {

          if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            console.log('用户按了允许授权按钮');
            this.login();
          } else {
            //用户按了拒绝按钮
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击了“返回授权”')
                }
              }
            })
          }
        },


      })