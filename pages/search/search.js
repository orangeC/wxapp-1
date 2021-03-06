var app = getApp();
Page({
  data: {
    amount: '',
    type: '',
    code: '',
    navigate: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    app.send("/shop/category", { code: options.code, name: '' }, "GET", function (res) {
      that.setData({
        type: res.data,
        code: options.code
      })
    });
    wx.setNavigationBarTitle({
      title: options.name,
      success: function (res) {
      }
    })
  },
  onShow: function () {
    this.setData({
      navigate: false
    })
  },
  onHide: function () {
    var that = this;
    app.send("/shop/category", { code: this.data.code, name: '' }, "GET", function (res) {
      that.setData({
        type: res.data,
      })
    })
  },
  goToDetail: function (e) {
    this.setData({
      navigate: !this.data.navigate
    })
    if (this.data.navigate) {
      wx.navigateTo({
        url: '/pages/index/index?' + 'code=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name,
      })
    }

  },
  searchType: function (e) {
    var that = this;
    app.send("/shop/category", { code: this.data.code }, "GET", function (res) {
      var search = [];
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].name.indexOf(e.detail.value) >= 0) {
          search.push(res.data[i])
        }
      }
      that.setData({
        type: search
      })
    })
  },
})