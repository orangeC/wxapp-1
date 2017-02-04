//index.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
    data: {
        markers: [{
            id: 0,
            latitude: 39.0446,
            longitude: 117.71206,
            width: 15,
            height: 20,
            alpha: 10
        },
        {
            id: 1,
            latitude: 39.0646,
            longitude: 117.71406,
            width: 15,
            height: 20,
            alpha: 10
        },
        {
            id: 2,
            latitude: 39.0846,
            longitude: 117.71606,
            width: 15,
            height: 20,
            alpha: 10
        },
        {
            id: 3,
            latitude: 39.1046,
            longitude: 117.71806,
            width: 30,
            height: 30,
            alpha: 10
        }
        ],
        name: "",
        address: "",
        latitude: 39.0246,
        longitude: 117.71006,
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
