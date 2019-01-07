var app = getApp()
Page({
  data: {
    
    //所有产品
    products:[],
    //书籍
    bookArr:[],
    //视频
    movieArr:[],
    //音频
    audioArr:[],
    //活动
    activeArr:[],
    //类型
    type:[],

    inputvalue: "",
    // height: 10000,
    // change:[],
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 1,
    state: false,
    first_click: false
  },


  onLoad: function(e) {
    var that = this;
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
    var book = [];
    var audio = [];
    var movie = [];
    var active = [];

    wx.request({
      url: app.globalData.url + '/api/collection/getAllCollection?sid=' + app.globalData.sid + '&userId=' + app.globalData.uid,
      method: "POST",
      success: function (res) {
        console.log(res);

        that.setData({
          products: res.data.data.hcCollectionVOList
        })
        var products = res.data.data.hcCollectionVOList;

        var type = app.globalData.firstClassifyList;
        console.log(app.globalData.firstClassifyList);
            for (var i = 0; i < type.length; i++) {
              for (var j = 0; j < products.length; j++) {
                if (type[i].id == products[j].firstClassifyId && type[i].classNumber == 1) {
                  book.push(products[j]);
                } else if (type[i].id == products[j].firstClassifyId && type[i].classNumber == 2) {
                  audio.push(products[j]);
                } else if (type[i].id == products[j].firstClassifyId && type[i].classNumber == 3) {
                  movie.push(products[j]);
                } else if (type[i].id == products[j].firstClassifyId && type[i].classNumber == 4){
                  active.push(products[j]);
                }
              }
            }
        that.setData({
          bookArr: book,
          movieArr: movie,
          audioArr: audio,
          activeArr: active
        });
        console.log("===========================================================");
        console.log("书");
        console.log(that.data.bookArr);
        console.log("音频");
        console.log(that.data.audioArr);
        console.log("视屏");
        console.log(that.data.movieArr);
        console.log("活动");
        console.log(that.data.activeArr);
        console.log("===========================================================");
      }
    });

  },


  /**
   * 滑动切换tab
   */
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current+1
    });
    // this.getHeight(e);
  },
  /**
   * 点击tab切换
   */
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current,
        current: e.currentTarget.dataset.current-1
      });
    }

    // console.log("******************************************")
    // console.log(that.data.bookArr);
    // this.getHeight(e);

  },

  // getHeight:function(e){
  //   console.log(e.currentTarget.dataset.current);
  //   var that = this;
  //   var obj = wx.createSelectorQuery();
  //   var h;
  //   var changeHeight = [];
  //   changeHeight = that.data.bookArr;
  //   if(e.currentTarget.dataset.current == 1){
  //     changeHeight = that.data.bookArr;
  //   } else if (e.currentTarget.dataset.current == 2){
  //     changeHeight = that.data.audioArr;
  //   } else if (e.currentTarget.dataset.current == 3){
  //     changeHeight = that.data.movieArr;
  //   }else{
  //     changeHeight = that.data.activeArr;
  //   }
  //   that.setData({
  //     change: changeHeight,
  //   })
  //   console.log(that.data.change);
  //   obj.select('.collectinglist').boundingClientRect(function (rect) {
  //     console.log(rect);
  //     h = rect.height * changeHeight.length;
  //     console.log(h);
  //     that.setData({
  //       height:h
  //     })

  //   })
  //   obj.exec();
  //   console.log(that.data.height);
  // }

 

})

