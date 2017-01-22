var app = getApp();
Page({
  data: {
    newsdata :""
  },
  //事件处理函数
  loadData: function () {
    var that = this;
    wx.request({
      url: 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          newsdata:res.data
        })
      }
    })
  }
})
