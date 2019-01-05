var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      nickname:"",
      jifenTotal:0,
      jifenDetail:[
      ]
    },
    
  },

  getIntegralList: function(){
    var that = this;
    var user = that.data.user;
    wx:wx.request({
      url: app.globalData.url + '/api/personalCenter/getIntegralRecord?userId=' + app.globalData.uid +'&sid=' + app.globalData.sid,
      header: {
        'X-Requested-With': 'APP'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
      
        var TotalList = res.data.data.hcIntegralRecordList;
        var jifenList = new Array(TotalList.length);
        
        //获取nickname
 
        var totalIntegral = 0;
        //填写jifenDetail 积分详情
        for (var i = 0; i < TotalList.length; i++) {
          var jifen = {
            jifenName: "",
            jifenType: "",
            jifenNumber: 0,
            jifenDate: ""
          };
          // 积分类型判断
          if(TotalList[i].type == 1){
            jifen.jifenType = "收入";
            jifen.jifenNumber = "+"+TotalList[i].integralQuantity;
            totalIntegral += TotalList[i].integralQuantity;
          }else if(TotalList[i].type == 2){
            jifen.jifenType = "支出";
            jifen.jifenNumber = "-" + TotalList[i].integralQuantity;
            totalIntegral -= TotalList[i].integralQuantity;
          }
          // 积分来源类型
          // 1 - 订单使用积分 2 - 订单结算得积分 3 - 订单取消返还 4 - 签到
          if (TotalList[i].integralSourceType == 1){
            jifen.jifenName = "订单使用积分";
          } else if (TotalList[i].integralSourceType == 2){
            jifen.jifenName = "订单结算得积分";
          }else if (TotalList[i].integralSourceType == 3) {
            jifen.jifenName = "订单取消返还";
          }else if (TotalList[i].integralSourceType == 4) {
            jifen.jifenName = "签到";
          }
          
          //设置积分日期
          jifen.jifenDate = that.dateSplite(TotalList[i].createTime);

          jifenList[i] = jifen;
        }
        //设置总积分
        user.jifenTotal = totalIntegral;
        user.jifenDetail = jifenList;
        
        wx.getUserInfo({
          success: function (res) {
            user.nickname = res.userInfo.nickName;
            console.log('nickName' + user.nickname)
          }
        })

        that.setData({
          'user': user
        })
        console.log('=====================');
        console.log(that.data.user);

      },
    })
  },

  dateSplite:function(date){
    date = date.substring(0,16);
    return date;
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getIntegralList();
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