//logs.js
var app = getApp()
Page({
  data: {
    title: "",
    showList: [
      { name: "帮家博士", tel: "18332563755", address: "滨海新区开发区第二大街与新城东路交口", type: "日常保洁、甲醛处理", range: "天津滨海新区", info: "日常保洁包括抽油烟机清理、户内外玻璃清洁、地板清洁、家具室内清洁等服务。价格根据具体情况会有所不同，欢迎欢迎热烈欢迎" }
    ],
    hidden: false,
    img:true,
    intro: true,
    tab:true,
    src: "https://qnmob.doubanio.com/view/movie_poster_cover/lpst/public/p2351313845.jpg?imageView2/0/q/80/w/9999/h/300/format/jpg/",
    switchTab : 1
  },
  onLoad: function (e) {
    console.log(e)
    wx.setNavigationBarTitle({ title: e.title });
  },
  onReady: function () {
    console.log("logs page execute: onReady.");
  },
  onShow: function () {
    // Do something when page show.
    console.log("logs page execute: onShow.");
    // var that = this;
    // setTimeout(function () {
    //   that.setData({
    //     hidden: true
    //   });
    // }, 1500);
  },
  handlejump: function () {
    wx.showToast({
      title: '已提交，请等待审核',
      icon: 'loading',
      duration: 3000
    });
    setTimeout(function () {
      wx.hideToast()
      wx.switchTab({
        url: '/pages/index/index'
      })
    }, 3000)
  },
  //切换服务状态
  serviceOne: function () {
    this.setData({switchTab:1})
  },
  serviceTwo: function () {
    this.setData({switchTab:2})
  },
  serviceThree: function () {
    this.setData({switchTab:3})
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
