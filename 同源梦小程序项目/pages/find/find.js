//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categoryList: [{
        category: '免费',
        isActive: "no-active",
      },
      {
        category: '旅游',
        isActive: "no-active",
      },
      {
        category: '运动',
        isActive: "no-active",
      },
      {
        category: '亲子',
        isActive: "no-active",
      },
      {
        category: '教育',
        isActive: "no-active",
      }
    ],
    activity : [{
      productCovermap: 'http://47.107.183.112/img/tourism.png',
      productTitle: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
      originalPrice: '免费',
      productSales: "9999"
    }],
    
    fisrtCategory: "active",
    searchinput: ""
  },
  onLoad: function() {
    this.getSecondClassify();
    this.searchProduct();
  },
  /**
   * 拿二级分类
   */
  getSecondClassify: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/api/product/getSecondClassify?sid=' + app.globalData.sid + "&firstClassifyId=" + app.globalData.firstClassifyList[3].id,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
        var SecondClassifyList = res.data.data.hcProductSecondClassifyList;
        var categoryList = [];
        for (let i = 0; i < SecondClassifyList.length; i++) {
          var SecondClassify = new Object;
          SecondClassify.category = SecondClassifyList[i].secondClassName;
          SecondClassify.isActive = "no-active";
          SecondClassify.id = SecondClassifyList[i].id;
          categoryList.push(SecondClassify);
        }
        that.setData({
          'categoryList': categoryList
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 跳转活动详情
   */
  activityDetail:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(JSON.stringify(this.data.activity[index]));
    app.globalData.activeDetail = this.data.activity[index];
    wx.navigateTo({
      url: '../eventDetails/eventDetails?type=find'
    })
  },
  /**
   * 搜索
   */
  searchProduct: function () {
    var that = this;
    var  firstClassifyId = app.globalData.firstClassifyList[3].id;
    var categoryList = this.data.categoryList;
    var categoryId = "";
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].isActive == "active") {
        categoryId = categoryList[i].id;
      }
    }
    wx.request({
      url: app.globalData.url + '/api/product/searchProduct?sid=' + app.globalData.sid + "&firstClassifyId=" + firstClassifyId + "&secondClassifyId=" + categoryId + "&keyword=" + that.data.searchinput + "&minStr=0" + "&maxStr=0" + "&page=1&size=12",
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
        console.log('=================');
        console.log(app.globalData.url + '/api/product/searchProduct?sid=' + app.globalData.sid + "&firstClassifyId=" + firstClassifyId + "&secondClassifyId=" + categoryId + "&keyword=" + that.data.searchinput + "&minStr=0" + "&maxStr=0" + "&page=1&size=12");
        var hcProductInfoList = res.data.data.hcProductInfoList;
        if (hcProductInfoList == null){
          wx.showToast({
            title: '没有内容!!!',
            icon: 'none',
            duration: 2000,
          })
          return;
        }
        for (let i = 0; i < hcProductInfoList.length; i++) {
          hcProductInfoList[i].productCovermap = app.globalData.url + ':80/common/file/showPicture.do?id=' + hcProductInfoList[i].productCovermap;
        }
        that.setData({
          'activity': hcProductInfoList
        })
      }
    })
  },


  /*
  / 用户点击类别
  */
  chooseCategory: function(e) {
    //获取点击的索引
    var index = e.target.dataset.index;
    var categoryList = this.data.categoryList;
    for (var i = 0; i < categoryList.length; i++) {
      categoryList[i].isActive = "no-active";
    }
    categoryList[index].isActive = "active";
    this.searchProduct();
    this.setData({
      'categoryList': categoryList,
      'fisrtCategory': "no-active"
    })
  },
  /*
  / 用户点击推荐
  */
  firstchose: function() {
    var categoryList = this.data.categoryList;
    for (var i = 0; i < categoryList.length; i++) {
      categoryList[i].isActive = "no-active";
    }
    this.setData({
      'categoryList': categoryList,
      'fisrtCategory': "active"
    })
  },
  /*
  / 清空搜索内容
  */
  deleteSearch: function() {
    this.setData({
      'searchinput': ""
    });
  },
  /**
   * 输入内容同步
   */
  inputBind:function(e){
    this.setData({
      'searchinput':e.detail.value
    })
  },
  query:function(){
    this.searchProduct();
  }

})