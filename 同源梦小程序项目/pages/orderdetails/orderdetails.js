var app = getApp()
Page({
  data: {
    local_database: [{
        orderId: "13564747834",
        state: "待支付",
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        number: "1",
        orderNumber: 0,
        chose: false,
        req: true,
        returngoods: 0, // 0-退货 1-退货退款
      },
      {
        orderId: "13564747834",
        state: "待支付",
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        number: "1",
        orderNumber: 1,
        chose: false,
        req: true,
        returngoods: "退货",
        underproval: "退款中"
      },
      {
        orderId: "13564747834",
        state: "待支付",
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        number: "1",
        orderNumber: 2,
        chose: false,
        req: true,
        returngoods: 0, // 0-退货 1-退货退款
      },
      {
        orderId: "13564747834",
        state: "待支付",
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        number: "1",
        orderNumber: 3,
        chose: false,
        req: true,
        returngoods: 0, // 0-退货 1-退货退款
      },
      {
        orderId: "13564747834",
        state: "待支付",
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        number: "1",
        orderNumber: 4,
        chose: false,
        req: true,
        returngoods: 0, // 0-退货 1-退货退款
      },
      {
        orderId: "13564747834",
        state: "待支付",
        bookImg: "../img/true.jpg",
        bookName: "数据结构视频",
        teacherName: "张三老师",
        price: "66",
        number: "1",
        orderNumber: 5,
        chose: false,
        returngoods: 0, // 0-退货 1-退货退款
      }
    ],
    inputvalue: "",
    h: 1,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 1,
    state: false,
    first_click: false
  },
  toggle: function(e) {
    var list_state = this.data.state,
      first_state = this.data.first_click;
    if (!first_state) {
      this.setData({
        first_click: true
      });
    }
    if (list_state) {
      this.setData({
        state: false
      });
    } else {
      this.setData({
        state: true
      });
    }
    let index = e.currentTarget.dataset.index;
    console.log("index=" + e.currentTarget.dataset.index); //获得索引下标值
    this.setData({
      'thisIndex': index
    })
  },
  complete: function(e) {
    this.setData({
      inputvalue: e.detail.value
    })
  },
  toggle1: function(e) {

    this.setData({
      state: false,
    });

    var local_database = this.data.local_database;

    //从退货变成退货中
    local_database[this.data.thisIndex].returngoods = 1;
    this.load();
    this.setData({
      inputvalue: ""
    })
  },
  load: function() {
    var local_database = this.data.local_database;
    for (var i = 0; i < local_database.length; i++) {
      if (local_database[i].returngoods == 0) {
        local_database[i].returngoods = "退货";
      } else if (local_database[i].returngoods == 1) {
        local_database[i].returngoods = "退货中";
      } else if (local_database[i].returngoods == 2) {
        local_database[i].returngoods = "已退货";
      }
      //若要扩展退货类型在此添加
    }
    this.setData({
      'local_database': local_database,
    });
  },
  check: function(e) {
    var input = e.detail.value; // 获取当前表单元素输入框内容
    if (input) {
      this.setData({
        'inputvalue': input
      })
      console.log("p");
    } else {

    }
  },





  onLoad: function() {
    var local_database = this.data.local_database;
    this.load();
    var that = this;
    var obj = wx.createSelectorQuery();
    var h1;
    this.setData({
      local_database: local_database,
    })
    obj.select('.obligation').boundingClientRect(function(rect) {
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
  cancelMenu: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除订单吗?',
      success: function(res) {
        if (res.confirm) {
          console.log('取消')
        } else {
          console.log('确定')
        }
      }
    })
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