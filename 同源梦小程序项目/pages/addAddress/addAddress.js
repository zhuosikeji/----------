var app = getApp();
//index.js
//获取应用实例
var tcity = require("../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hcUserAddress: {
      userId: '',
      userName: '',
      userPhone: '',
      areaIdPath: '',
      userAddress: '',
      isDefault: '',
    },

    isSelection: 0,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.formSubmit();
    that.bindChange();
    that.open();
    that.onLoad();
    that.isSelection();
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

  // 是否选中框
  isSelection: function (e) {
    if (this.data.isSelection == 0) {
      this.data.isSelection = 1
      console.log("没有默认地址" + this.data.isSelection);
    }
    else {
      this.data.isSelection = 0
      console.log("默认地址" + this.data.isSelection);
    }
  },
  // 省市区
  bindChange: function (e) {
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })
      return;
    }

    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  // 打开
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  // 关闭
  onLoad: function () {
    console.log("onLoad");
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    // 北京市
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
      console.log(cityData[0].sub[i].name);
    }
    // 北京市里面的市区
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    // 初始化
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');

  },

  // 保存
  formSubmit: function (e) {
    console.log(e);
    console.log('uid' + app.globalData.uid);
    var that = this;
    var valuesList = that.data.values;
    var cityData = this.data.cityData;
    var a = 0, b = 0, c = 0;
    var code;
    for (var i = 0; i < valuesList.length; i++) {
      //  省
      if (i == 0) {
        a = valuesList[i];
      }
      //  市
      if (i == 1) {
        b = valuesList[i];
      }
      //  县
      if (i == 2) {
        c = valuesList[i];
      }
    }
    code = cityData[a].code + "-" + cityData[a].sub[b].code + "-" + cityData[a].sub[b].sub[c].code;
    console.log("code：" + code);

    // 交互
    var formdata = {
      hcUserAddress: {
        userId: app.globalData.uid,
        userName: e.detail.value.userName,
        userPhone: e.detail.value.userPhone,
        areaIdPath: code,
        userAddress: e.detail.value.detilAddress,
        isDefault: this.data.isSelection,
      },
    }
    wx.request({
      url: app.globalData.url + '/api/userAddress/saveAddress?sid=' + app.globalData.sid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP',
      },
      data: JSON.stringify(formdata),
      success: function (data) {
        console.log("保存成功！");
      }
    })

    wx.showModal({
      title: '保存成功',
      content: '请返回查看',
      showCancel: false,
      confirmText: '返回',
      success: function (res) {
        wx: wx.navigateTo({
          url: '../address/address',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })

  },
})

