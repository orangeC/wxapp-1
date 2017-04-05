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
  },
  onShow: function () {
    var that = this;
    that.setData({
      navigate: false
    })
    //用户每次登陆系统, 记录用户访问信息
    app.send(
      '/wechat/visit',
      {
        UserCode: app.globalData.user.clientCode,
        ActionType: app.globalData.clientType
      },
      'POST',
      function (res) {
      }
    )
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