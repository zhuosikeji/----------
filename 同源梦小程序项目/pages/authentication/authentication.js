var md5 = require('../utils/md5.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男', '女'],
    sfz: 421023199909216116,
    user: {
      userId: "275e9cba-94ac-4ce3-9450-081fa1192723",
      realName: "dqq",
      sex: "男",
      documentType: "身份证",
      provinceCardNumber: "43**************11"
    },
    // 手机号跟验证码
    phoneNumber: "",
    verificationCode: "",
    showView: true,
    beginTime: 30,
    timeset: null
  },
  bindSexChange(e) {
    var userSex = "user.sex";
    var userIdType = "user.documentType";
    this.setData({
      index: e.detail.value,
    })
    this.setData({
      [userSex]: this.data.sex[this.data.index]
    })
    console.log(this.data.index);
    console.log(this.data.user.sex);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 设置选择时的默认id
    this.setData({
      index: 0
    });
    var userId = "user.userId";
    this.setData({
      [userId]: app.globalData.uid,
    })
    var userSex = "user.sex";
    if (this.data.index == 0) {
      this.setData({
        [userSex]: this.data.sex[this.data.index]
      });
    }
    console.log(this.data.user.sex);
  },

  checkUser: function(e) {

    var that = this;
    var userName = "user.realName";
    var userIdNumber = "user.provinceCardNumber";
    this.setData({
      [userName]: e.detail.value.userName,
      [userIdNumber]: e.detail.value.IdNumber
    })


    if (this.data.user.realName == "" || this.data.user.sex == "" || this.data.user.documentType == "" || this.data.user.provinceCardNumber == "" || this.data.phoneNumber == "" || this.data.verificationCode == "") {
      wx.showToast({
        title: '信息不完整',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.user.provinceCardNumber))) {
      wx.showToast({
        title: '身份证号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    } else {
      console.log(that.data.user);
      wx.request({
        url: app.globalData.url + '/api/personalCenter/authentication?sid=' + app.globalData.sid,
        method: "POST",
        header: {
          'X-Requested-With': 'APP'
        },
        data: {
          "hcPUnUserRealInfo": that.data.user
        },
        success: function(res) {
          console.log(res);
          that.checkCode(e);
        }
      })


      // wx.navigateTo({
      //   url: 'success/success?user=' + JSON.stringify(this.data.user),
      // })
    }
  },

  getPhoneNumber: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  getVerificationCode: function(e) {
    this.setData({
      verificationCode: e.detail.value
    })
    console.log(this.data.verificationCode);
  },
  //定时器
  settime: function() {
    var that = this;
    this.data.timeset = setInterval(function() {
      that.setData({
        beginTime: --that.data.beginTime
      })
      if (that.data.beginTime == 0) {
        that.setData({
          beginTime: 30,
          showView: (!that.data.showView)
        })
        clearInterval(that.data.timeset)
        return;
      }
    }, 1000);
  },
  getCode: function(e) {

    var that = this;
    console.log(that.data.phoneNumber);
    var SMS_CODE_SALT = "sljksdf@34#s51";
    var currentTimeMillis = new Date();
    console.log(parseInt((currentTimeMillis.getTime() / 60000)))
    var key = SMS_CODE_SALT + this.data.phoneNumber + parseInt((currentTimeMillis.getTime() / 60000));
    var type = 0
    key = md5.hexMD5(key);
    if (that.data.phoneNumber == "") {
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
    } else {
      that.settime();
      that.setData({
        showView: (!that.data.showView)
      });
      //向后台发起请求
      //获取验证码

      console.log(key);
      wx.request({
        url: app.globalData.url + '/api/anon/sendCode?sid=' + app.globalData.sid + '&type=' + type + '&key=' + key + '&to=' + that.data.phoneNumber,
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

  checkCode: function(e) {
    var that = this;
    //判断手机号和验证码是否为空
    if (this.data.verificationCode == "" || this.data.phoneNumber == "") {
      var title = this.data.phoneNumber == "" ? '请填写手机号' : '请填写验证码';
      wx.showToast({
        title: title,
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    var codeEndTime = Date.now();
    //判断验证码是否失效
    if ((codeEndTime - that.data.codeSendTime) > 180 * 1000) {
      wx.showToast({
        title: "验证码已失效",
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    //验证手机号
    wx.request({
      url: app.globalData.url + '/api/personalCenter/mobilePhoneBinding?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid + '&code=' + that.data.verificationCode + '&to=' + that.data.phoneNumber,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        wx.showToast({
          title: '验证成功',
          duration: 2000,
        });
        wx.switchTab({
          url: '../personalCenter/personalCenter',
        })
      },
      fall:function(){
        wx.showToast({
          title: '验证失败',
          duration: 2000,
          icon:'none'
        });
      }
    })
  }

})