Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList:[
      {
        imagePath:"../image/car.svg",
        title:"物流助手",
        inform:"已签收，您在墨刀X数码专营店购买的宝贝已经被本人签收，如有问题请致电：13442665742",
        number:1
      },
      {
        imagePath:"../image/sound.svg",
        title:"通知信息",
        inform: "已签收，您在墨刀X数码专营店购买的宝贝已经被本人签收，如有问题请致电：13442665742",
        number:2
      }
    ],
    activity:[
      {
        imagePath: "../image/gift.svg",
        title: "梦缘活动",
        inform: "恭喜你获得了一次抢红包的机会 >>",
        number: 2,
        time:"11:55"
      },
      {
        imagePath: "../image/gift.svg",
        title: "梦缘活动",
        inform: "恭喜你获得了一张优惠券 >>",
        number: 2,
        time: "11:20"
      },
      {
        imagePath: "../image/gift.svg",
        title: "梦缘活动",
        inform: "恭喜你获得了一次抢红包的机会 >>",
        number: 2,
        time: "11:55"
      },
      {
        imagePath: "../image/gift.svg",
        title: "梦缘活动",
        inform: "恭喜你获得了一张优惠券 >>",
        number: 2,
        time: "11:20"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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