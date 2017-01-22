var app = getApp();
Page({
  data: {
    email: "",
    password: ""
  },
  //事件处理函数
  bindEmailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
    console.log(this.data.email)
  },
  bindPassInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },
  login: function (e) {
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
      duration: 5000
    });
    //数据请求开始
    wx.request({
      url: 'https://api.gugujiankong.com/account/Login?email=' + this.data.email + '&password=' + this.data.password, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.LoginStatus == 1) {
          //进行一些用户状态的存储
          //进行tab切换
          wx.switchTab({
            url: '../index/index',
            success:function(){
              console.log("跳转成功")
            }
          })
          console.log("成功")
        } else {
          wx.showModal({
            title: '登陆失败',
            content: '请检查您填写的用户信息',
            showCancel: false,
            success: function (res) {
              //回调函数
              console.log("完了没进去")
            }
          })
        }
      }
    })
  }
})
