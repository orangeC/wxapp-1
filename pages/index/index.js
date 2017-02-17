//index.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
  data: {
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    address: "定位当前位置",
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
    // var that = this;
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.chooseLocation({
    //       fail:function(){
    //         console.log("地图没出来")
    //       },
    //       success:function(res){
    //         var name = res.name
    //         var address = res.address
    //         var latitude = res.latitude
    //         var longitude = res.longitude
    //         that.setData({
    //           name: name,
    //           address: address,
    //           latitude:latitude,
    //           longitude:longitude
    //         })
    //         console.log( "纬度 : " +that.data.latitude)   //经纬度
    //         console.log( "经度 : " +that.data.longitude)
    //         console.log( "地点 : " +that.data.name)
    //         console.log( "位置 : " +that.data.address)
    //       }
    //     })
    //     // wx.openLocation({
    //     //   latitude: latitude,
    //     //   longitude: longitude,
    //     //   scale: 28
    //     // })
    //   }
    // })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
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
    })
    // app.send("http://radar.3vcar.com//shop/search/")
  },
  bindKeyJump:function(e){
    var i = e.target.id;
    wx.navigateTo({
      url: '/pages/other/other?data='+this.data.arr[i]
    })
  },
  // onReady:function(){
  //   this.getData()
  // },

  // getData:function(){
  //   var that=this;
  //   this.setData({
  //     name:app.globalData.name
  //   })
  // },
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
       url: 'pages/category/category'
    })
  }

})