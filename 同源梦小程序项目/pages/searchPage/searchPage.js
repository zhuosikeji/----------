//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categoryList: [{
        category: '销量',
        isActive: "no-active",
      },
      {
        category: '价格',
        isActive: "no-active",
      },
      {
        category: '筛选',
        isActive: "no-active",
      }
    ],
    product: [{
        productImageUrl: 'http://47.107.183.112/img/tourism.png',
        productName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
        price: '免费',
        collectionNumber: "9999"//收藏人数
      }, {
        productImageUrl: 'http://47.107.183.112/img/tourism.png',
        productName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
        price: '免费',
        collectionNumber: "9999"
      }, {
        productImageUrl: 'http://47.107.183.112/img/tourism.png',
        productName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
        price: '免费',
        collectionNumber: "9999"
      },
      {
        productImageUrl: 'http://47.107.183.112/img/tourism.png',
        productName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
        price: '免费',
        collectionNumber: "9999"
      }
    ],
    category: [{
        categoryName: "管理",
        class: "",
        id: ""
      }, {
        categoryName: "文学",
        class: "",
        id:""
      }],
    // 商品类型样式 
    // 索引对应字段：0：实体商品 1：音频 2：视频 3：线下活动
    typesBtnActive: ["btnActive", "", "", ""],
    state: false,
    first_click: false,
    fisrtCategory: "active",
    searchinput: "",
    priceFilter: ["", ""],
    hidden: "hidden",
    all_state: true
  },

  onLoad: function(options) {
    //获取首页来的搜索词
    var keyword = options.key;
    console.log(keyword);
    this.setData({
      'searchinput': keyword
    })
    this.getSecondClassify();
    // TODO正则验证价格区间是否为正整数 若不是则弹框
    // var myreg = /^[1 - 9]\d*$/;
    // console.log(myreg.test('aasd'));
    // TODO综合，销量，价格筛选，调整商品数组顺序
  },
  /**
   * 拿二级分类
   */
  getSecondClassify:function(){
    var that = this;
    var typesBtnActive = this.data.typesBtnActive;
    var firstClassifyId = "";
    for (let i = 0; i < typesBtnActive.length; i++){
      if (typesBtnActive[i] == "btnActive"){
        firstClassifyId = app.globalData.firstClassifyList[i].id;
      }
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/api/product/getSecondClassify?sid=' + app.globalData.sid + "&firstClassifyId=" + firstClassifyId,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
        // category: [{
        //   categoryName: "管理",
        //   class: "",
        //   id: ""
        // }
        var SecondClassifyList = res.data.data.hcProductSecondClassifyList;
        var category = [];
        for (let i = 0; i < SecondClassifyList.length;i++){
          var SecondClassify = new Object;
          SecondClassify.categoryName = SecondClassifyList[i].secondClassName;
          SecondClassify.class = "";
          SecondClassify.id = SecondClassifyList[i].id;
          category.push(SecondClassify);
        }
        that.setData({
          'category': category
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 筛选搜索
   */
  searchProduct:function(){
    var that = this;
    var typesBtnActive = this.data.typesBtnActive;
    var firstClassifyId = "";
    for (let i = 0; i < typesBtnActive.length; i++){
      if (typesBtnActive[i] == "btnActive"){
        firstClassifyId = app.globalData.firstClassifyList[i].id;
      }
    }
    wx.request({
      url: app.globalData.url + '/api/product/searchProduct?sid=' + app.globalData.sid + "&firstClassifyId=" + firstClassifyId + "",
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 分类打开全部
   */
  allBtn:function(){
    var list_state = this.data.all_state;
    if (list_state) {
      this.setData({
        all_state: false
      });
    } else {
      this.setData({
        all_state: true
      });
    }
  },
  /**
   * 重置
   */
  reset:function() {
    var category = this.data.category;
    var typesBtnActive = this.data.typesBtnActive;
    for (var i = 0; i < category.length; i++) {
      category[i].class = "";
    }
    for (var j = 0; j < category.length; j++) {
      typesBtnActive[j] = "";
    }
    this.setData({
      'typesBtnActive': typesBtnActive,
      'category': category,
      'priceFilter':["",""]
    })
  },
  /**
   * 选择商品分类
   */
  categoryClick:function(e) {
    var index = e.target.dataset.index;
    var category = this.data.category;
    for (var i = 0; i < category.length; i++) {
      category[i].class = "";
    }
    category[index].class = "btnActive";
    this.setData({
      'category': category
    })
    
    
  },
  /**
   * 选择商品类型(一级分类)
   */
  typesClick: function(e) {
    var index = e.target.dataset.index;
    var typesBtnActive = this.data.typesBtnActive;
    for (var i = 0; i < typesBtnActive.length; i++) {
      typesBtnActive[i] = "";
    }
    typesBtnActive[index] = "btnActive";
    this.setData({
      'typesBtnActive': typesBtnActive
    })
    this.getSecondClassify();
  },
  /**
   * 框架动画事件
   */
  toggle: function() {
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
  },
  /**
   * 用户确认价格区间
   */
  priceConfirm: function(e) {
    var index = e.target.dataset.index;
    var priceFilter = this.data.priceFilter;
    console.log(e);
    priceFilter[index] = e.detail.value;
    this.setData({
      'priceFilter': priceFilter
    })
  },
  /*
  / 用户点击类别
  */
  chooseCategory: function(e) {
    //TODO 根据不同的类型（data里的索引为依据）判断业务逻辑
    //获取点击的索引
    var index = e.target.dataset.index;
    var categoryList = this.data.categoryList;
    for (var i = 0; i < categoryList.length; i++) {
      categoryList[i].isActive = "no-active";
    }
    if (index == 2) {
      this.toggle();
    }
    categoryList[index].isActive = "active";
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
  }

})