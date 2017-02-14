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
    head: "",
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
    movie: {},
    point: {
      latitude: "23.099994",
      longitude: "113.324520"
    },
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(item) {
    var that = this;
    //调用缓存获得clientcode
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({ clientid: res.data.ClientCode });
        console.log(that.data.clientid)
        console.log("上一行商家页面拿到的缓存中的user")
      }
    })

    app.send("http://radar.3vcar.com/shop/get/?code=" + 42956288
      , {}, "GET", function (res) {
        var data = res.data;
        console.log(data);
        that.setData({ title: data.Name, head: data.Head, Name: data.Name, LikedAmount: data.LikedAmount, Phone: data.Phone, Address: data.Address, Longitude: data.Longitude, Latitude: data.Latitude, Category: data.Category, Description: data.Description })
      })

    // this.setData({
    //   title:item.title
    //   })

  },

  // onLoad: function() {
  //   console.log( '地图定位接口getLocation还不能正常获取用户位置！' )
  //   var that = this;
  //   wx.getLocation( {
  //     type: 'wgs84',
  //     success: function( res ) {
  //       //我这里测试获取的数据一直是一样的（TIT创意园），官方接口没真正开放，还是没发布的原因
  //       var latitude = res.latitude
  //       var longitude = res.longitude
  //       var speed = res.speed
  //       var accuracy = res.accuracy;
  //       var point={
  //            latitude: latitude,
  //            longitude: longitude
  //       }
  //       var markers = [ {
  //         latitude: latitude,
  //         longitude: longitude,
  //         name: '地图定位',
  //         desc: '我现在的位置'
  //       }];
  //       that.setData( markers );
  //        that.setData( point );
  //     }
  //   })
  // }


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    wx.setNavigationBarTitle({ title: this.data.title });
  },
  //点赞
  bindClicklike: function () {
    var that = this;
    console.log(that.data.clientid)
    app.send("http://radar.3vcar.com/shop/like/", { client: that.data.clientid, code: 42956288 }, "POST", function (res) {
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
          title: '别点了SB',
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
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  },
  onShareAppMessage: function onShareAppMessage() {
    // return {
    //   title: '自定义分享标题',
    //   desc: '自定义分享描述',
    //   path: '/pages/item?id=' + this.data.id
    // };
  }
});
//# sourceMappingURL=item.js.map
