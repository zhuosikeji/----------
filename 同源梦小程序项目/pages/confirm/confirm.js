var app = getApp();
Page({
  data: {
    address: {
      username: "",
      telephone: "",
      address: "没有收货地址，请点击左边链接添加！",
      id:""
    },
    goodsList: [{
      productName: "线性代数",
      oldprice: "66.00",
      productImage: "../image/math.jpg",
      count: 1,
      price: 0
    }, {
      productName: "线性代数",
      oldprice: "66.00",
      productImage: "../image/math.jpg",
      count: 1,
      price: 0
    }],
    delivery: {
      discount: "8.5",
      integral: "2000"
    },
    inputValue: "",
    coupon: [{
        money: "￥40",
        dikou: "抵用券",
        name: "通用",
        manjian: "290",
        use: "立即选择",
        check: false
      },
      {
        money: "￥40",
        dikou: "抵用券",
        name: "通用",
        manjian: "290",
        use: "立即选择",
        check: false
      }
    ]
  },
  /**
   * 选择优惠券
   */
  chooseCoupon: function(e) {
    //拿选择的索引
    var index = e.currentTarget.dataset.index;
    //拿到优惠券
    var coupon = this.data.coupon;
    if (!coupon[index].check) {
      for (let i; i < coupon.length; i++){
        coupon[index].check = false;
      }
      coupon[index].check = true;
      coupon[index].use = '已选择';
    } else {
      coupon[index].check = false;
      coupon[index].use = '立即选择';
    }
    this.setData({
      'coupon': coupon
    })
  },
  onLoad: function(options) {
    //拿到订单数据
    this.setData({
      'goodsList': app.globalData.productCartList
    })
    //拿到可用优惠券
    this.showCoupon();
    this.getAddress();
  },
  /**
   * 查询优惠券
   */
  showCoupon: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/coupon/showCoupon?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function(res) {
        console.log(res);
        var couponVOS = res.data.data.couponVOS;
        var couponList = []; 
        for (let i = 0; i < couponVOS.length; i++){
          var coupon = {
            money: "40",
            dikou: "抵用券",
            name: "通用",
            manjian: "满300减20",
            use: "立即选择",
            check: false,
            couponId:""
          };
          coupon.money = couponVOS[i].preferentialAmount;
          coupon.couponId = couponVOS[i].id;
          switch (couponVOS[i].usableRange) {
            case 0: coupon.name = "通用";
            break;
            case 1: coupon.name = "实体商品 ";
              break;
            case 2: coupon.name = "声音课程";
              break;
            case 3: coupon.name = "视频课程";
              break;
            case 4: coupon.name = "活动";
              break;
          }
          if(couponVOS[i].couponsTypes == 2){
            coupon.dikou = "折扣";
          }
          coupon.manjian = couponVOS[i].name;
          couponList[i] = coupon;
        }
        that.setData({
          'coupon': couponList
        })

      }
    })
  },

  /**
   * 获取用户地址
   */
  getAddress :function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/userAddress/getAddress?sid=' + app.globalData.sid + "&userId=" + app.globalData.uid,
      method: "POST",
      header: {
        'X-Requested-With': 'APP'
      },
      success: function (res) {
        console.log(res);
        var address = that.data.address;
        var hcUserAddressList = res.data.data.hcUserAddressList;
        //没有收货就选择默认值
        if (hcUserAddressList.length==0){
          return;
        }
        for (let i = 0; i < hcUserAddressList.length; i++){
          if (hcUserAddressList[i].isDefault==true){
            address.username = hcUserAddressList[i].userName;
            address.telephone = hcUserAddressList[i].userPhone;
            address.address = hcUserAddressList[i].userAddress;
            address.id = hcUserAddressList[i].id;
          }
        }
        that.setData({
          'address': address
        })
      }
    })
  },


  /**
   * 获取买家留言
   */
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  address: function() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  favourable: function() {
    wx.navigateTo({
      url: '../favourable/favourable',
    })
  },
  paid: function() {
    wx.navigateTo({
      url: '../paid/paid',
    })
  }
})