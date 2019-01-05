Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:"",
    isFolded: true,
    rows:5,
    activities: {
      coverPath:"http://47.107.94.80/box-info1.jpg",
      productTitle:"拓展活动项目2013深圳亲子活动方案",
      activitiPlace:"深圳南山科兴科学园B2栋16楼",
      beginTime:"2018-12-13",
      endTime:"2018-12-20",
        price:99,
      activitiIntroduction:"亲子活动是指父母陪着孩子在假期参加一些社团或者企业组织的一些有益于儿童成长的活动，促进孩子与父母的关系，让孩子结识更多的好朋友。通过活动锻炼孩子参与探索的性格，能让孩子在少年时期，身心健康发展。根据国内领先的亲子活动的分类，亲子活动可以分为：户外亲子、亲子体验、主题活动、家庭游戏等。具体表现为：宝宝爬行比赛，小小搬运工比赛，宝宝扭扭车比赛，宝宝保龄球比赛，宝宝生日会，儿童科普活动，童心梦想秀，亲子读书会，户外郊游，亲子体验等等内容。",
      imgArr: [
        ' http://47.107.94.80/main1.jpg',
        'http://47.107.94.80/main3.jpg',
        'http://47.107.94.80/main2.jpg',
        ' http://47.107.94.80/main1.jpg',
        'http://47.107.94.80/main3.jpg',
        'http://47.107.94.80/main2.jpg',
      ]
    },
  
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
    
  },
  change: function (e) {
    if (this.data.isFolded) {
      this.setData({isFolded:false,rows:5000});
    }else{
      this.setData({ isFolded: true, rows: 3 });
    }
  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var imgArr = this.data.activities.imgArr;
    console.log(imgArr);
    wx.previewImage({
      current: this.data.activities.imgArr[index],     //当前图片地址
      urls: this.data.activities.imgArr,               //所有要预览的图片的地址集合 数组形式
    })
  
   
  }
})