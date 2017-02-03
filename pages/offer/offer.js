//logs.js
var app = getApp()
Page({
  data: {
    title: "请求过来的商家店名",
    showList: [
      { title: "衣保姆6", ser: "保洁6", distance: "600m", heart: "6", tel: "161718", address: "第6大街", content: "contentsix" }
    ],
    hidden: false,
    movie: {},
    point: {
      latitude: "23.099994",
      longitude: "113.324520"
    },
    markers: []
  },
  onLoad: function () {

  },
  onReady: function () {
    console.log("logs page execute: onReady.");
    wx.setNavigationBarTitle({ title: this.data.title });
  },
  onShow: function () {
    // Do something when page show.
    console.log("logs page execute: onShow.");
    var that = this;
    setTimeout(function () {
      that.setData({
        hidden: true
      });
    }, 1500);
  },
  handlejump:function(){
    wx.navigateTo({
      url: '../edit/edit'
    })
  },
  onHide: function () {
    // Do something when page hide.
    console.log("logs page execute: onHide.");
  },
  onUnload: function () {
    // Do something when page close.
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