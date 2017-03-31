// pages/other/other.js
'use strict';
//局应用程序实例对象
var app = getApp();
// 创建页面实例对象
Page({
  data: {
    address:'',
    category:'',
    code:'',
    head:'',//头像图片
    latitude:'',
    longitude:'',
    liked:'',
    name:'',
    phone:'',
    markers: '',
    description:''
  },

  //打电话
  toCall:function(call){
      var that = this;
      var call = call.currentTarget.dataset.id;
      wx.makePhoneCall({
        phoneNumber: call,
        success: function(res) {

        }
      })
  },

  //点赞
  liked:function(){
        var that = this;
        app.send(
            '/wechat/like',
            {
                client:app.globalData.user.clientCode,
                code:that.data.code
            },
            'POST',
            function(res){
                if(res.data.Success){
                    that.setData({
                        liked:that.data.liked + 1,
                    })
                    wx.showToast({
                        title: '点赞成功',
                        icon: 'success',
                        duration: 2000
                    })
                }else{
                    wx.showToast({
                    title: res.data.Message,
                    icon: 'loading',
                    duration: 2000
                    })
                }
            },
        );
  },

  //打开地图
  openMap:function(){
        var that = this;
        wx.openLocation({
          latitude: that.data.latitude, // 纬度，范围为-90~90，负数表示南纬
          longitude: that.data.longitude, // 经度，范围为-180~180，负数表示西经
          scale: 15, // 缩放比例
          name: that.data.name, // 位置名
          address: that.data.address, // 地址的详细说明
          success: function(res){
          },
        })
  },

  onLoad: function (code) {
    var that = this;
    var code = code.code;
    app.send(
        '/shop/load',
        {
          code:code,
        },
        'GET',
        function(res){
            var apply = res.data;
            var markers = [{
                id:0,
                iconPath: "../../images/address5.png",
                "latitude": apply.latitude,
                "longitude": apply.longitude,
                title: apply.name
            }];
            that.setData({
                address:apply.address,
                category:apply.category,
                code:apply.code,
                head:apply.head,//头像图片
                latitude:apply.latitude,
                longitude:apply.longitude,
                liked:apply.liked,
                name:apply.name,
                phone:apply.phone,
                description:apply.description,
                markers:markers,
            })
        },
    );
  },

  onReady: function () {
      wx.setNavigationBarTitle({ title: this.data.name });
  },

  onShow: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        hidden: true
      });
    }, 1500);
  },

  load:function(){
  }
});