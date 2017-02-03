//logs.js
var app = getApp()
Page({
  data: {
    title: "商家入驻",
    showList: [
      { name: "帮家博士", tel: "18332563755", address: "滨海新区开发区第二大街与新城东路交口", type: "请选择", range: "天津滨海新区", info: "详细描述你的服务" }
    ],
    hidden: false,
    intro: false
  },
  onLoad: function () {

  },
  onReady: function () {
    console.log("logs page execute: onReady.");
    wx.setNavigationBarTitle({ title: this.data.title });
  },
  onShow: function () {
    var that = this;
    if (this.data.title == "商家入驻") {
      that.setData({
        hidden: true
      })
    }
    console.log("logs page execute: onShow.");

  },
  handlejump: function () {
    wx.showToast({
      title: '已提交，请等待审核',
      icon: 'loading',
      duration: 5000,
      complete: function () {
        console.log("成功")
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    });
  },
  onHide: function () {
    // Do something when page hide.
    console.log("logs page execute: onHide.");
  },
  onUnload: function () {
    console.log("logs page execute: onUnload.");
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log("logs page execute: onPullDownRefresh.");
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log("logs page execute: onReachBottom.");
  }
})
