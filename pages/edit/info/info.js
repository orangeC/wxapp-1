// pages/notice/notice.js
Page({
  data: {
    conetnt: ""
  },

  onLoad: function (options) {
    if (!options.data == "请写下描述") {
      this.setData({ conetnt: options.data })
    } else {
      return;
    }
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  getInputName: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  handlejump: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      description: this.data.content
    });
    wx.navigateBack({
      delta: 1
    })
  }
})