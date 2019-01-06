var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payClass: ['充值钱包', '提现', '订单消费', ' 订单退款', '佣金'],
      selected: true,
      selected1: false,
      selected2: false,
    },


  onLoad: function () {
    this.getWalletRecord();
  },

  //TODO 区分收入与支出
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true,
      selected2: false
    })
  },

  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected1: false
    })
  },

  getWalletRecord: function () {
    console.log('uid'+app.globalData.uid);
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/personalCenter/getWalletRecord?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
        var recardSours = res.data.data.hcWalletTransactionRecordList;
        for (var i = 0; i <recardSours.length; i++){
          for (var j = 0; j <5;j++){
            if (recardSours[i].sourceType ==(j+1)) {
              recardSours[i].sourceType= that.data.payClass[j];
              if(j<=2){
                recardSours[i].transactionAmount = 0- recardSours[i].transactionAmount;
                // selected1();
              }else{
                recardSours[i].transactionAmount = '+'+recardSours[i].transactionAmount;
                // selected2();
              }
            }
          }
        }
        that.setData({
          'recardSours': recardSours,
        });
      }
    })
  },
})