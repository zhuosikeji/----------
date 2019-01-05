Page({
  data: {
    memberInformation: {
      memberCartImage: "http://47.107.183.112/img/membercart.jpg"
    },
    memberCategory: [{
      memberCategoryName: "健康专属会员",
      price: "19800",
      ischecked: true,
      program: "方案1：全基因检测1次，19800元 / 人\n建立家庭健康档案管理及全年跟踪服务\n专家检测报告解读服务：1500元 / 人\n肝胆排毒门票2张，费用：2980元 / 张\n全食养智能破壁机1台，价值：3980元 / 台\n参加全年线下美食沙龙活动\n名额2人\n参加线上 / 线下全年专家健康沙龙分享会\n名额2人\n方案二：\n1.60天健康工程调理（健康档案和体检报告，解读）费用：20000元\n2.肝胆排毒门票2张\n费用2980元/张\n3.参加全年线下美食沙龙活动，名额2人\n4.参加全年线上/线下专家健康沙龙分享会，名额2人\n方案三：\n1.商城所有产品享受会员价格\n2.肝胆排毒门票2张，费用2980元/张\n3.参加全年线下美食沙龙活动，名额2人\n4.参加全年线上/线下专家健康沙龙分享会，名额2人\n5.全食养智能破壁机1台，价值：3980元"
    }, {
      memberCategoryName: "教育专属会员",
      price: "19800",
      ischecked: false
    }, {
      memberCategoryName: "农业专属会员",
      price: "19800",
      ischecked: false
    }, {
      memberCategoryName: "旅游专属会员",
      price: "19800",
      ischecked: false
    }],
    thisindex: 0,
    state: false,
    first_click: true
  },
  onLoad: function() {

  },
  /**
   * 选择会员
   */
  chooseMember: function(e) {
    //获取点击索引
    var index = e.currentTarget.dataset.index;
    var memberCategory = this.data.memberCategory;
    for (var i = 0; i < memberCategory.length; i++) {
      memberCategory[i].ischecked = false;
    }
    memberCategory[index].ischecked = true;
    this.setData({
      'memberCategory': memberCategory,
      'thisindex': index
    })
  },
  more: function() {
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