Page({
  data: {
    videoInformation:{
      name: "寂静之声-亲子教育",
      thisindex: 0,
      desption: "正面管教是目前全球领先的教育方法，源自美国，由简尼尔森博士等教育专家历经30多年实践发展与完善，让数以千万计的家长学会了“不骄纵不惩罚”“和善与坚定”并行的育儿方法。",
      // 评分
      score: 7.4,
      category: "家庭",
      // 当前更新集数
      nowEpisodes: "10",
      // 全部更新集数
      allEpisodes: "40"
    },
    
    video: [{
        videoName: "面对孩子的问题父母怎么处理",
        videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      }, {
        videoName: "梦想的界定",
        videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      }, {
        videoName: "孩子要怎样获得正能量",
        videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      }, {
        videoName: "孩子成长中的动力和阻力",
        videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      }
    ],
    //当前播放的视频索引
    IsHidden: true,
    state: true,
    first_click: false,
  },
  onReady(res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  inputValue: '',
  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },
  /*
  / 选择视频
  */
  choosevideo:function(e) {
    //获取点击的索引
    var index = e.currentTarget.dataset.index;
    var videoInformation = this.data.videoInformation;
    videoInformation.thisindex = index;
    this.setData({
      'videoInformation': videoInformation
    });
    this.videoContext.play();
  },
  
  /**
   * 下拉按钮
   */
  toggle: function () {
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
  }

})