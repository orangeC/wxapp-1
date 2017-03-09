// pages/other/other.js
'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Head: "",
    Name: "",
    LikedAmount: 0,
    Phone: "",
    Address: "",
    Longitude: 0,
    Latitude: 0,
    Category: "",
    Description: "",
    title: "",
    hidden: false,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(item) {
    console.log(item);
    var that = this;
    that.setData({ item: item.data })
    console.log(this.data.item);
    //获取内存中user 的 ClientCode
    var ClientCode = app.globalData.user.ClientCode;
    console.log(ClientCode);
    that.setData({
      clientid: ClientCode
    });

    app.send("http://radar.3vcar.com/shop/get/?code=" + that.data.item
      , {}, "GET", function (res) {
        var data = res.data;
        console.log(data);
        var markers = [{
          "latitude": data.Latitude,
          "longitude": data.Longitude
        }]
        that.setData({
          title: data.Name, Head: data.Head, Name: data.Name, LikedAmount: data.LikedAmount, Phone: data.Phone, Address: data.Address, Longitude: data.Longitude, Latitude: data.Latitude, Category: data.Category, Description: data.Description,markers: markers })
        //获取内存中data 的 RequestData
        var RequestData = app.globalData.data.RequestData;
        console.log(RequestData);
        //将获取到的 RequestData 编码换成对应的name
        for (var i = 0; i < RequestData.length; i++) {
          if (RequestData[i].code == that.data.Category) {
            that.setData({
              Category: RequestData[i].name
            });
            break;
          }
        };
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({ title: this.data.title });
  },
  //打电话
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.Phone
    })
  },
  //点赞
  bindClicklike: function () {
    var that = this;
    console.log(that.data.clientid)
    app.send("http://radar.3vcar.com/shop/like/", { client: that.data.clientid, code: that.data.item }, "POST", function (res) {
      console.log(res)
      wx.showToast({
        title: '点赞中。。。',
        icon: 'loading',
        duration: 3000
      })
      if (res.data.Success) {
        wx.showToast({
          title: '点赞 + 1',
          icon: 'success',
          success: function () {
            that.setData({
              LikedAmount: that.data.LikedAmount + 1
            })
          }
        })
      }
      else {
        wx.showToast({
          title: '你已经点过了',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        hidden: true
      });
    }, 1500);
  }


});
//# sourceMappingURL=item.js.map
