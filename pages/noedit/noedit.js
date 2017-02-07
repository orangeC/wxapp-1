//logs.js
var app = getApp()
Page({
  data: {
    title: "商家入驻",
    shopStatus: true,
    showList: [
      { name: "帮家博士", tel: "18332563755", address: "滨海新区开发区第二大街与新城东路交口", type: "请选择", range: "天津滨海新区", info: "详细描述你的服务" }
    ],
    img: false,
    hidden: false,
    intro: false,
    myPic: null,
  },
  onLoad: function () {
    if (!this.data.shopStatus) {
      wx.navigateTo({
        url: '../offer/offer'
      })
    }
  },
  onReady: function () {
    console.log("logs page execute: onReady.");
    wx.setNavigationBarTitle({ title: this.data.title });
  },
  onShow: function () {
    var that = this;
    if (this.data.title == "商家入驻") {
      that.setData({
        hidden: true
      })
    }
    console.log("logs page execute: onShow.");

  },
  handlejump: function () {
    wx.showToast({
      title: '已提交，请等待审核',
      icon: 'loading',
      duration: 3000,
      complete: function () {
        console.log("成功")
      }
    });
    setTimeout(function () {
      wx.hideToast()
      wx.switchTab({
        url: '/pages/index/index'
      })
    }, 3000)
  },
  //点击头像开始上传
  upload: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'file.3vcar.com/file/uploadapp', 
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log(res)
          }
        })
      },
    })
  },
  onHide: function () {
    // Do something when page hide.
    console.log("logs page execute: onHide.");
  },
  onUnload: function () {
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
