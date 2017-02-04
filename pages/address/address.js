//index.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
    data: {
        markers: [],
        name: "",
        address: "",
        latitude: 0,
        longitude: 0,
        hidden: true
    },
    //事件处理函数

    //获取位置
    bindKeyInput: function () {
        console.log(1)
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                wx.chooseLocation({
                    fail: function () {
                        console.log("地图没出来")
                    },
                    success: function (res) {
                        var name = res.name
                        var address = res.address
                        var latitude = res.latitude
                        var longitude = res.longitude
                        that.setData({
                            name: name,
                            address: address,
                            latitude: latitude,
                            longitude: longitude,
                            hidden: false
                        })
                        console.log("纬度 : " + that.data.latitude)   //经纬度
                        console.log("经度 : " + that.data.longitude)
                        console.log("地点 : " + that.data.name)
                        console.log("位置 : " + that.data.address)
                    }
                })
                // wx.openLocation({
                //   latitude: latitude,
                //   longitude: longitude,
                //   scale: 28
                // })
            }
        })
    }


})
