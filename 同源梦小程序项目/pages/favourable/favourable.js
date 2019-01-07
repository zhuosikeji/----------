var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // discount:[
    //   {
    //     money:"￥40",
    //     dikou:"抵用券",
    //     name:"幸福学院通用优惠券",
    //     manjian:"满290可用",
    //     use:"立即使用"
    //   },
    //   {
    //     money: "￥40",
    //     dikou: "抵用券",
    //     name: "幸福学院通用优惠券",
    //     manjian: "满290可用",
    //     use: "立即使用"
    //   },
    //   {
    //     money: "￥40",
    //     dikou: "抵用券",
    //     name: "幸福学院通用优惠券",
    //     manjian: "满290可用",
    //     use: "立即使用"
    //   }http://hih5jg.natappfree.cchttp://hih5jg.natappfree.cchttp://hih5jg.natappfree.cchttp://hih5jg.natappfree.cchttp://4ek4ic.natappfree.cchttp://4ek4ic.natappfree.cchttp://4ek4ic.natappfree.cc
    
    // ]
  },
  favdata:function(){
    var that=this;
    wx.request({
      url: app.globalData.url + '/api/coupon/showCoupon?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res1) {
        console.log(res1);
        console.log(res1.data.data.couponVOS[0].name);
        that.setData({
          couponVOS: res1.data.data.couponVOS
        })
        // var couponVOS = res1.data.data.couponVOS;
        // console.log(that.data.data.couponVOS);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1);
    this.favdata();
   
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
    
  }
})