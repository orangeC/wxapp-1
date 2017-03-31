// pages/notice/notice.js
Page({
  data: {
    query: "",
    content: ""
  },
  onLoad: function (options) {
    this.setData({ query: options.data })
  },
  onReady: function () {
    this.setData({ content: this.data.query });
  },
  getInputName: function (e) {
    this.setData({
      query: e.detail.value
    });
  },
  handlejump: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      description: this.data.query
    });
    wx.navigateBack({
      delta: 1
    })
  }
})