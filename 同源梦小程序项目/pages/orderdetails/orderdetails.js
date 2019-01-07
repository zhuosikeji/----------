var app = getApp();
var pendingOrderList = new Array();
var shippedOrderList = new Array();
var receivedOrderList = new Array();
var successAndRefundOrderList = new Array();
Page({
  data: {
    h: 320,
    inputvalue: "",
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 1,
    current: 0,
    page: 0,
    pageSize: 3,
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

    var local_database = this.data.orderVOList;

    //从退货变成退货中
    local_database[this.data.thisIndex].returngoods = 1;
    //this.load();
    this.setData({
      inputvalue: ""
    })
  },
  
  check: function(e) {
    var input = e.detail.value; // 获取当前表单元素输入框内容
    if (input) {
      this.setData({
        'inputvalue': input
      })
    } else {

    }
  },
  //获得订单
  getOrders: function(orderState) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/order/getOrderByOrderState?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid + "&orderState=" + orderState + "&page=" + 1 + "&size=" + 5,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        switch (orderState) {
          case '1':
            //待付款货订单
            for (var i = 0; i < res.data.data.orderVOList.length; i++) {
              if (that.getList(pendingOrderList, res.data.data.orderVOList[i])) {
                pendingOrderList.push(res.data.data.orderVOList[i]);
              }
            }
            that.setData({
              pendingOrderList: pendingOrderList
            })
            break;
          case '2':
            for (var i = 0; i < res.data.data.orderVOList.length; i++) {
              if (that.getList(shippedOrderList, res.data.data.orderVOList[i])) {
                shippedOrderList.push(res.data.data.orderVOList[i]);
              }
            }
            that.setData({
              shippedOrderList: shippedOrderList
            })
            break;
          case '3':
            for (var i = 0; i < res.data.data.orderVOList.length; i++) {
              if (that.getList(receivedOrderList, res.data.data.orderVOList[i])) {
                receivedOrderList.push(res.data.data.orderVOList[i]);
              }
            }
            that.setData({
              receivedOrderList: receivedOrderList
            })
            break;
          case '4':
            for (var i = 0; i < res.data.data.orderVOList.length; i++) {
              if (that.getList(successAndRefundOrderList, res.data.data.orderVOList[i])) {
                  successAndRefundOrderList.push(res.data.data.orderVOList[i]);
              }
            }
            break;
          case '5':
            for (var i = 0; i < res.data.data.orderVOList.length; i++) {
              if (that.getList(successAndRefundOrderList, res.data.data.orderVOList[i])) {
                  successAndRefundOrderList.push(res.data.data.orderVOList[i]);
              }
            }
            that.setData({
              successAndRefundOrderList: successAndRefundOrderList
            })
            console.log(successAndRefundOrderList);
            console.log(that.data.successAndRefundOrderList);
            break;
        }

      }
    })
  },
  //判断数组中存在某个元素
  getList: function(list, item) {
    if (list.length != 0) {
      for (var j = 0; j < list.length; j++) {
        if (item.orderNum != list[j].orderNum) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  },
  //下拉分页请求
  onPullDownRefresh: function() {
    var page = this.data.page;
    this.data.page += this.data.pageSize;
    this.data.pageSize = (page + 1) * this.data.pageSize;
    var options = {
      state: this.data.currentTab
    };
    this.onLoad(options);
  },


  onLoad: function(options) {
    var state = options.state;
    console.log("state=" + state);
    if (state != null) {
      this.setData({
        currentTab: JSON.parse(state),
      })
      this.setData({
        current: this.data.currentTab - 1
      })
    }
    if (this.data.currentTab < 4) {
      this.getOrders(state);
    } else {
      this.getOrders("4");
      this.getOrders("5");
    }

    /**
     * 获取系统信息
     */
    var that = this;
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    //}
  },
  onShow: function() {
    //this.getOrders(this.data.currentTab);
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
      currentTab: e.detail.current + 1
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
        currentTab: e.target.dataset.current,
        current: e.target.dataset.current - 1
      })
      var options = {
        state: e.target.dataset.current
      }
      that.onLoad(options);
    }
  }
})