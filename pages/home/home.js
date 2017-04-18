// pages/home/home.js
var app = getApp();
Page({
  data: {
    navigate: false
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.send("/shop/category", { code: '', name: '' }, "GET", function (res) {
      that.setData({
        home: res.data[0],
        daily: res.data[1],
        industry: res.data[2]
      })
    });
    var arrData = [];
    for (var i = 0; i < app.globalData.arrDataCategory.length; i++) {
      if (app.globalData.arrDataCategory[i].code.slice(0, 3) == app.globalData.noPass.category.slice(0, 3) && app.globalData.arrDataCategory[i].tier == 2) {
        arrData.push(app.globalData.arrDataCategory[i])
      }
    }
    for (var i = 0; i < arrData.length; i++) {
      if (arrData[i].code == app.globalData.noPass.category) {
        app.globalData.noPass.index = i
      }
    }
  },
  onShow: function () {
    var that = this;
    that.setData({
      navigate: false
    })
  },
  search: function (e) {
    this.setData({
      navigate: !this.data.navigate
    })
    if (this.data.navigate) {
      wx.navigateTo({
        url: '/pages/search/search?' + 'code=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name,
      })
    }
  }
})