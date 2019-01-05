Page({

  /**
   * 页面的初始数据
   */
  data: {
    cash:{
      card:"中国建设银行卡（1100）",
      imagePath:"../image/right2.svg",
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindKeyInput(e) {
    e.detail.value={value:" "};
    e.detail.value=" ";
    this.setData({
      inputValue: e.detail.value
    })
  }
})