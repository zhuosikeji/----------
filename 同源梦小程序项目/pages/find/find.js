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
      activityImageUrl: 'http://47.107.183.112/img/tourism.png',
      activityName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
      price: '免费',
      collectionNumber: "9999"
    }, {activityImageUrl: 'http://47.107.183.112/img/tourism.png',
        activityName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
      price: '￥399.00',
        collectionNumber:"9999"
      },{
        activityImageUrl: 'http://47.107.183.112/img/tourism.png',
        activityName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
        price: '￥799.00',
        collectionNumber: "9999"
      },
      {
        activityImageUrl: 'http://47.107.183.112/img/tourism.png',
        activityName: '厦门+鼓浪屿6日5晚半自助游(5钻)·双旦狂欢 9人小团 ',
        price: '￥599.00',
        collectionNumber: "9999"
      }],
    
    fisrtCategory: "active",
    searchinput: ""
  },
  onLoad: function() {
  

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