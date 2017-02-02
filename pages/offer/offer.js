//logs.js
var app = getApp()
Page({
  data: {
    title:"请求过来的商家店名"
  },
  onLoad: function () {
    
  },
  onReady: function() {
    console.log("logs page execute: onReady.");
     wx.setNavigationBarTitle({ title: this.data.title});
  },
  onShow: function() {
    // Do something when page show.
    console.log("logs page execute: onShow.");
    console.log(app.globalData.userInfo)
  },
  onHide: function() {
    // Do something when page hide.
    console.log("logs page execute: onHide.");
  },
  onUnload: function() {
    // Do something when page close.
    console.log("logs page execute: onUnload.");
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    console.log("logs page execute: onPullDownRefresh.");
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    console.log("logs page execute: onReachBottom.");
  },
})
