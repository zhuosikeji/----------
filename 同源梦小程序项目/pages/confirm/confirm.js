//logs.js
// const util = require('../../utils/util.js')
Page({
  data: {
    order:[{
      username: "南墙先生",
      telephone:"18806030603",
      address:"福建厦门思明莲前软件园二期海路",
    }],
    goodsList:[{
      name:"线性代数",
      oldprice:"66.00",
      imagePath:"../image/math.jpg",
      number:1,
      price: 0
    }, {
        name: "线性代数",
        oldprice: "66.00",
        imagePath: "../image/math.jpg",
        number: 1,
        price: 0
      }],
    delivery:{
      discount:"8.5",
      integral:"2000"
    },
    inputValue:""
  },
  onLoad: function (options){
    console.log(options);
    // var productList = JSON.parse(options.productList);
    // console.log(productList);
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  address: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  favourable:function(){
    wx.navigateTo({
      url: '../favourable/favourable',
    })
  },
  paid:function(){
    wx.navigateTo({
      url: '../paid/paid',
    })
  }
})







