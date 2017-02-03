//logs.js
var app = getApp()
Page({
  data: {
    title: "请求过来的商家店名",
    showList: [
      { name: "帮家博士",tel:"18332563755",address:"滨海新区开发区第二大街与新城东路交口"}
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
