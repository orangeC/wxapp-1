//index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
  data: {
    name: "",
    latitude: 0,
    longitude: 0,
    address: "获取周边位置",
    show: true,
    shop: {},
    arr: []
  },
  //事件处理函数

  //获取位置
  bindWeizhi: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },

  onLoad: function () {
    console.log('onLoad');
    var that = this;
    qqmapsdk = new QQMapWX({
			key: '3PGBZ-GMYKI-ZL752-5T752-BAAZZ-NBFMZ'
		});
    //调用应用实例的方法获取全局数据
    wx.request({
      url: "http://radar.3vcar.com/shop/search/", //获取所有商家
      data: {
        name: '',
        longitude: 117.52412,
        latitude: 38.98755,
        category: "",
        distance: 100000
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var arr = [];
        for(var i=0;i<res.data.length;i++){
          arr.push(res.data[i].code)
        }
        that.setData({
          shop: res.data,arr:arr
        })
      }
    });

    	// 调用接口
    	qqmapsdk.reverseGeocoder({
    		poi_options: 'policy=2',
    		get_poi: 1,
		    success: function(res) {
				console.log(res);
				that.setData({
					address: res.result.address
				});
		    },
		    fail: function(res) {
		//console.log(res);
		    },
		    complete: function(res) {
		//console.log(res);
		    }
    	});
  },

  bindKeyJump:function(e){
    var i = e.target.id;
    wx.navigateTo({
      url: '/pages/other/other?data='+this.data.arr[i]
    })
  },
  
  onReady: function () {
    console.log("onshow")
    console.log(this.data.arr)
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value)
  },

  formSubmit: function (e) {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: "http://radar.3vcar.com/shop/search/", //获取所有商家
      data: {
        name: e.detail.value.input,
        longitude: 117.52412,
        latitude: 38.98755,
        category: "",
        distance: 100000
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          shopSearch: res.data,
          show: false,
        })
        console.log(e.detail.value.input)
      }
    })
  },

  onPullDownRefresh: function(){
    wx.showToast({
      title: '拼命加载中',
      icon: 'loading',
      duration: 10000
    })
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: "http://radar.3vcar.com/shop/search/", //获取所有商家
      data: {
        name: this.data.name,
        longitude: 117.52412,
        latitude: 38.98755,
        category: "",
        distance: 100000
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var arr = [];
        for(var i=0;i<res.data.length;i++){
          arr.push(res.data[i].code)
        }
          that.setData({
            shop: res.data,arr:arr
          })
        wx.hideToast()
      }
    })
    wx.stopPullDownRefresh()
  },

  bindtap:function(){
    wx.navigateTo({
       url: '/pages/category/category'
    })
  }

})