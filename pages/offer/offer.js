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
    addressOffer:'',
    categoryOffer:'',
    codeOffer:'',
    headOffer:'',//头像图片
    latitudeOffer:'',
    longitudeOffer:'',
    likedOffer:'',
    nameOffer:'',
    phoneOffer:'',
    markersOffer: '',
    descriptionOffer:''
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
  liked:function(code){
        var that = this;
        var code = code.currentTarget.dataset.code;
        var client = wx.getStorageSync('user');
        console.log(client);
        console.log(client.ClientCode);
        app.send(
            '/wechat/like',
            {
                client:client.ClientCode,
                code:code
            },
            'POST',
            function(res){
                console.log(res);
                if(res.data.Success){
                    that.setData({
                        liked:that.data.likedOffer + 1,
                    })
                }else{
                    wx.showToast({
                    title: '已点赞',
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
          latitude: that.data.latitudeOffer, // 纬度，范围为-90~90，负数表示南纬
          longitude: that.data.longitudeOffer, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例
          name: that.data.nameOffer, // 位置名
          address: that.data.addressOffer, // 地址的详细说明
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
            console.log(res.data);
            var apply = res.data;
            var markers = [{
                id:0,
                iconPath: "../../images/address3.png",
                "latitude": apply.latitude,
                "longitude": apply.longitude,
                width: 30,
                height: 30,
                title: apply.name
            }];
            that.setData({
                addressOffer:apply.address,
                categoryOffer:apply.category,
                codeOffer:apply.code,
                headOffer:apply.head,//头像图片
                latitudeOffer:apply.latitude,
                longitudeOffer:apply.longitude,
                likedOffer:apply.liked,
                nameOffer:apply.name,
                phoneOffer:apply.phone,
                descriptionOffer:apply.description,
                markersOffer:markers,
            })
        },
    );

  },

  onReady: function () {
      wx.setNavigationBarTitle({ title: this.data.nameOffer });
      
  },

  onShow: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        hiddenOffer: true
      });
    }, 1500);
  },

  });
