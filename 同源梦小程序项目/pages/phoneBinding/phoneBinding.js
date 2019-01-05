
var verificationCode = 1234556;

var phoneNumber = "11111111111";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // hidden: true
    showView: true,
    beginTime:60,
    timeset:null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      phoneNumber: phoneNumber,
      // showView: (options.showView == "true" ? true : false)
    })
  },
  settime:function(){
    var that = this;
    this.data.timeset = setInterval(function(){
      that.setData({
        beginTime: --that.data.beginTime
      })
      if (that.data.beginTime == 0) {
      that.setData({
        beginTime:60,
        showView: (!that.data.showView)
      })
      clearInterval(that.data.timeset)
      console.log(that.data.beginTime);
      return;
    }
    },1000);
  },


  getCode:function(){
    this.settime();
    this.setData({
      showView: (!this.data.showView)
    });
    
    //向后台发起请求
    //wx.request({
    //   url: 'test.php', // 仅为示例，并非真实的接口地址
    //   data: {
    //     phoneNumber: phoneNumber
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data);
        // this.setData({
        //   verificationCode: verificationCode
        // })
    //   }
    // })
    console.log("验证码是" + verificationCode);
  },

  checkCode:function(){
    //验证成功
    // wx.showModal({
    //   title: '提示',
    //   content: '验证成功',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    //验证失败
    wx.showModal({
      title: '提示',
      content: '验证失败，请输入正确的验证码',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})