//index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
  data: {
    name: "",
    latitude: '',//定位用户目前GPS
    longitude: '',//定位用户目前GPS
    areaSelectedStr: "定位中",
    show: true,
    shop: '',
    arr: [],
    address:'',
  },
  //获得地址
  toAddress: function () {
        var that = this;
        wx.chooseLocation({
            success: function(res){
                console.log(res);
                app.globalData.latitude = res.latitude;
                app.globalData.longitude = res.longitude;
                wx.setStorageSync('address', res.address);
                that.setData({
                    address:res.address,
                });
                that.load(app.globalData.codeIndex);             
            },
            fail: function() {

            },
        })
  },
  //去详情页
  toOther:function(e){
      var code = e.currentTarget.dataset.code;
      wx.navigateTo({
        url: '/pages/other/other?code=' + code,
      })
  },

  onLoad: function (ecode) {
      var that = this;
      console.log(ecode.code);
      app.globalData.codeIndex = ecode.code;
      that.setData({
            latitude:app.globalData.latitude,
            longitude:app.globalData.longitude,
      });
      app.send(
            '/shop/search',
            {
                category:ecode.code,//传code值
                latitude:that.data.latitude,
                longitude:that.data.longitude,
            },
            'GET',
            function(res){
                console.log(res.data);
                var shop = res.data;
                for(var i = 0;i < shop.length;i++){
                    // shop[i].distance = Math.round(shop[i].distance);
                    var distance = Math.round(shop[i].distance);
                    if(distance >= 1000){
                        shop[i].units = true;
                        var dis = Math.round(distance/1000);
                        shop[i].distance = dis; 
                    }else{
                        shop[i].units = false;
                        shop[i].distance = distance;
                    }
                };
                that.setData({
                    shop:shop,
                });
            },
      )

    wx.setNavigationBarTitle({
        title: ecode.name,
        success: function(res) {
        }
    })
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

  onShow:function(){
      
  },
  
  onReady: function () {
    // console.log("onshow")
    // console.log(this.data.arr)
  },
  bindKeyInput: function (e) {
    // console.log(e.detail.value)
  },
  load:function(code){
      var that = this;
    app.send(
        '/shop/search',
        {
            category:code,//传code值
            latitude:app.globalData.latitude,
            longitude:app.globalData.longitude,
        },
        'GET',
        function(res){
            console.log(res.data);
            var shop = res.data;
            for(var i = 0;i < shop.length;i++){
                shop[i].distance = Math.round(shop[i].distance);
            };
            that.setData({
                shop:shop,
            });
        },
    )
  }
})