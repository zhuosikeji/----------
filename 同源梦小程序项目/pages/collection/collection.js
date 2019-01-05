var app = getApp()
Page({
  data: {
    local_database: [{
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        orderNumber: 0,
        chose: false,
      },
      {
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        orderNumber: 0,
        chose: false,
      },
      {
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        orderNumber: 0,
        chose: false,
      },
      {
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        orderNumber: 0,
        chose: false,
      },
      {
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        orderNumber: 0,
        chose: false,
      },
      {
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        orderNumber: 0,
        chose: false,
      }
    ],
    inputvalue: "",
    h: 1,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    state: false,
    first_click: false
  },
  onLoad: function() {
    var local_database = this.data.local_database;
    var that = this;
    var obj = wx.createSelectorQuery();
    var h1;
    this.setData({
      local_database: local_database,
    })
    obj.select('.collectinglist').boundingClientRect(function(rect) {
      h1 = rect.height * local_database.length;
      that.setData({
        h: h1
      })
    })
    obj.exec();
    console.log(this.data.local_database[1].chose); //false
    console.log(this.data.local_database[1].orderNumber); //1
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 滑动切换tab
   */
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  /**
   * 点击tab切换
   */
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})