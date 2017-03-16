// pages/search/search.js
var app = getApp();
Page({
  data: {
      amount:'',
      type:''
  },
  onLoad: function (options) {
      // 页面初始化 options为页面跳转所带来的参数
      var that = this;
      app.send("/shop/category", { code: options.code, name: '' }, "GET", function (res) {
        console.log(res);
        that.setData({
          type: res.data,
          code: options.code
        })
      });
      wx.setNavigationBarTitle({
        title: options.name,
        success: function(res) {
          
        }
      })
  },
  onReady: function (options) {
      
  },
  onShow: function (options) {
      
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  goToDetail: function (e) {
    wx.navigateTo({
        url: '/pages/index/index?' + 'code=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name,
    })
  },
  searchType: function (e) {
    var that=this;
      app.send("/shop/category", { code:this.data.code, name: e.detail.value }, "GET", function (res) {
        that.setData({
          type: res.data
        })
      })
  },

})