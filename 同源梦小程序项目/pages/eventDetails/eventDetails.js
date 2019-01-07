var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: "",
    isFolded: true,
    rows: 5,
    activitiesList: {
      coverPath: "",
      productTitle: "",
      activitiPlace: "",
      beginTime: "",
      endTime: "",
      price: 0,
      activitiIntroduction: "",
      showColor: "#ff0000",
      imgArr: []
    },
  },

  showActiveDetail: function(options) {
    var that = this;
    var activeDetail = null;
    var activitiesList = new Object();
    if (options.type == "find") {
      activeDetail = app.globalData.activeDetail;
      console.log(app.globalData.activeDetail);
      //填写属性
      activitiesList.coverPath = activeDetail.productCovermap;
      activitiesList.productTitle = activeDetail.productTitle;
      if (activeDetail.price == 0) {
        activitiesList.price = "免费"
        activitiesList.showColor = "#F9A505";
      } else {
        activitiesList.price = activeDetail.originalPrice;
      }
      activitiesList.activitiPlace = activeDetail.productTitle;
      activitiesList.beginTime = "2019年1月10日";
      activitiesList.endTime = "2019年1月25日";
      activitiesList.activitiIntroduction = activeDetail.courseIntroduce;
    } else { 
      //填写属性
      activeDetail = JSON.parse(options.activeDetail);
      
      activitiesList.coverPath = activeDetail.coverPath;
      activitiesList.productTitle = activeDetail.productTitle;
      if (activeDetail.price == 0) {
        activitiesList.price = "免费"
        activitiesList.showColor = "#F9A505";
      } else {
        activitiesList.price = activeDetail.price;
      }
      activitiesList.activitiPlace = activeDetail.activitiPlace;
      activitiesList.beginTime = that.dateSplite(activeDetail.beginTime);
      activitiesList.endTime = that.dateSplite(activeDetail.endTime);
      activitiesList.activitiIntroduction = activeDetail.activitiIntroduction;
    }
    console.log(activitiesList);
    that.setData({
      'activitiesList': activitiesList
    })

  },

/**
 * 设置图片数组
 */
  setImgArr: function() {
    var that = this;
    var activeDetail = this.data.activeDetailList;
    wx.request({
      url: app.globalData.url + '/api/product/getProductPicture?&sid=' + app.globalData.sid + '&id=' + activeDetail.id,
      header: {
        'X-Requested-With': 'APP'
      },
      method: 'POST',
      success: function(res) {
        var TotalList = res.data.data.hcProductPictureList;
        var imgArrList = new Array(TotalList.length);
        for (var i = 0; i < TotalList.length; i++) {
          var imgPath = TotalList[i].productImgPath
          imgArrList[i] = imgPath;
        }

        console.log(this)
        that.setData({
          'activitiesList.imgArr': imgArrList
        })

      }
    })
  },

  // 格式化日期
  dateSplite: function(date) {
    date = date.substring(0, 10);
    return date;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.showActiveDetail(options);
    // this.setImgArr();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  change: function(e) {
    if (this.data.isFolded) {
      this.setData({
        isFolded: false,
        rows: 5000
      });
    } else {
      this.setData({
        isFolded: true,
        rows: 3
      });
    }
  },
  previewImg: function(e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.activities.imgArr;
    wx.previewImage({
      current: this.data.activities.imgArr[index], //当前图片地址
      urls: this.data.activities.imgArr, //所有要预览的图片的地址集合 数组形式
    })


  }
})