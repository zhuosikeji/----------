Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:['男','女'],
    sfz:421023199909216116,
    user:{
      name: "",
      sex: "",
      IdType: "身份证",
      IdNumber:"43**************11"
    }
  },
  bindSexChange(e) {
    var userSex = "user.sex";
    var userIdType = "user.IdType";
    this.setData({
      index: e.detail.value,
    
    })
    this.setData({
      [userSex]: this.data.sex[this.data.index]
    })
    console.log(this.data.index);
    console.log(this.data.user.sex);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置选择时的默认id
    this.setData({
      index: 0
    });
    var userSex = "user.sex";
    if(this.data.index == 0){
      this.setData({
        [userSex]: this.data.sex[this.data.index]
      });
    }
    console.log(this.data.user.sex);
  },

  checkUser:function(e){
    var userName = "user.name";
    var userIdNumber = "user.IdNumber";
    this.setData({
      [userName]: e.detail.value.userName,
      [userIdNumber]: e.detail.value.IdNumber
    })
    console.log(this.data.user.name);
    console.log(this.data.user.sex);
    console.log(this.data.user.IdType);
    console.log(this.data.user.IdNumber);

    if (this.data.user.name == "" || this.data.user.sex=="" || this.data.user.IdType=="" || this.data.user.IdNumber==""){
      wx.showToast({
        title: '信息不完整',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.user.IdNumber))) {
      wx.showToast({
        title: '身份证号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }else {
      wx.navigateTo({
        url: 'success/success?user=' + JSON.stringify(this.data.user),
      })
    }
  },

 
})