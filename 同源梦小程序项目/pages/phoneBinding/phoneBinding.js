
var md5 = require('../utils/md5.js');

// var verificationCode = 1234556;

var app = getApp();

// var phoneNumber = "11111111111";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // hidden: true
    showView: true,
    beginTime:10,
    timeset:null,
    phoneNumber:"",
    verificationCode:""
   
  },


  getPhoneNumber:function(e){
    this.setData({
      phoneNumber:e.detail.value
    })
  },
  getVerificationCode:function(e){
    this.setData({
      verificationCode: e.detail.value
    })
    console.log(this.data.verificationCode);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    console.log(this.data.phoneNumber);
  },

  //定时器
  settime:function(){
    var that = this;
    this.data.timeset = setInterval(function(){
      that.setData({
        beginTime: --that.data.beginTime
      })
      if (that.data.beginTime == 0) {
      that.setData({
        beginTime:10,
        showView: (!that.data.showView)
      })
      clearInterval(that.data.timeset)
      return;
    }
    },1000);
  },


  getCode:function(e){
    var that = this;
    var SMS_CODE_SALT = "sljksdf@34#s51";
    var currentTimeMillis = Date.now();
    var key = SMS_CODE_SALT + this.data.phoneNumber + (currentTimeMillis/60000).toString();
    var type = 0
    key = md5.hexMD5(key);
    if (that.data.phoneNumber==""){
      wx.showToast({
        title: '请填写手机号码',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    if (!(/^1[34578]\d{9}$/.test(that.data.phoneNumber))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }else{
      that.settime();
      that.setData({
        showView: (!that.data.showView)
      });
      //向后台发起请求
    wx.request({
      url: app.globalData.url + '/api/anon/sendCode?sid=' + app.globalData.sid + '&type=' + type + '&key='+ key +'&to=' + that.data.phoneNumber,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success(res) {
        console.log(res.data);
        console.log("成功");
        var codeSendTime = Date.now();
        that.setData({
          codeSendTime: codeSendTime
        })
      }
    })
    }
  },

  checkCode:function(e){
    

    var that = this;
    //判断手机号和验证码是否为空
    if (this.data.verificationCode == "" || this.data.phoneNumber == "") {
      var title = this.data.phoneNumber == ""?'请填写手机号':'请填写验证码';
      wx.showToast({
        title: title,
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    console.log(app.globalData.uid);
    console.log(that.data.verificationCode);
    console.log(that.data.phoneNumber);

    console.log("验证码发送的时间");
    console.log(that.data.codeSendTime);
    var codeEndTime = Date.now();
    console.log("验证码失效的时间");
    console.log(codeEndTime);
    //判断验证码是否失效
    if ((codeEndTime-that.data.codeSendTime) > 180*1000){
      wx.showToast({
        title: "验证码已失效",
        duration: 2000,
        icon: 'none'
      });
      return false;
    }

    wx.request({
      url: app.globalData.url + '/api/personalCenter/mobilePhoneBinding?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid + '&code=' + that.data.verificationCode + '&to=' + that.data.phoneNumber,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success:function(res) {
        console.log(res);
        wx.showToast({
          title: '验证成功',
          duration: 2000,
        });
        wx.switchTab({
          url: '../personalCenter/personalCenter',
        })
       
      }
    })
  }
})