// pages/home/home.js
var app = getApp();
Page({
  data: {

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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;
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
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  search: function (e) {
    wx.navigateTo({
      url: '/pages/search/search?' + 'code=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name,
    })
  }
})