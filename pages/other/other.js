// pages/components/other.js
'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    loading: false,
    movie: {},
    point:{
      latitude: "23.099994",
      longitude: "113.324520"
    },
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    var _this = this;

    // app.douban.findOne(params.id).then(function (d) {
    //   _this.setData({ title: d.title, movie: d, loading: false });
    //   wx.setNavigationBarTitle({ title: d.title + 'XX 商家' });
    // }).catch(function (e) {
    //   _this.setData({ title: '获取数据异常', movie: {}, loading: false });
    //   console.error(e);
    // });
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
    wx.setNavigationBarTitle({ title: this.data.title + 'XX商家' });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
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
