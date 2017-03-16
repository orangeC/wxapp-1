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
        wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var speed = res.speed;
                var accuracy = res.accuracy;
                wx.chooseLocation({
                    success: function(res){
                        console.log(res.address);
                        wx.setStorageSync('address', res.address);
                        that.setData({
                            address:res.address,
                        });              
                    },
                    fail: function() {

                    },
                })
            }
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
      wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function(res){
              that.setData({
                  latitude:res.latitude,
                  longitude:res.longitude
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
                          shop[i].distance = Math.round(shop[i].distance);
                      };
                      that.setData({
                          shop:shop,
                      });
                  },
                  function(res){

                  }
              )
          },
          fail: function(res) {
            
          },
      })
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
      var that = this;
      var address = wx.getStorageSync('address');
      that.setData({
          address:address,
      });
  },
  
  onReady: function () {
    // console.log("onshow")
    // console.log(this.data.arr)
  },
  bindKeyInput: function (e) {
    // console.log(e.detail.value)
  },

})