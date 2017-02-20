//index.js
var app = getApp();
Page({
    data: {
        map_width: 300,
        map_height: 300,
        name: "",
        address: "",
        latitude: 0,
        longitude: 0,
        hidden: true,  
    },

    onLoad: function (){
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                that.setData({
                    latitude: latitude,
                    longitude: longitude
                })            
            }
        });        
    },
    
    

    //获取位置
    bindKeyInput: function () {
        var that = this;
        wx.getLocation({
            type: 'gcj02',
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
                            hidden: false,
                            markers: [
                                {
                                    id: 7
                                    , longitude: longitude
                                    , latitude: latitude
                                    , width: 30
                                    , height: 30
                                }
                            ]
                        })
                        console.log("纬度 : " + that.data.latitude)   //经纬度
                        console.log("经度 : " + that.data.longitude)
                        console.log("地点 : " + that.data.name)
                        console.log("位置 : " + that.data.address)
                    }
                })
            }
        })

    },

    //移动地图时发生
    // regionchange(e) {
    //     if (e.type == 'end') {
    //         this.showmarkers()
    //     }
    // },
    getCenterLocation: function () {
        this.getLngLat()
    },
    moveToLocation: function () {
        this.mapCtx.moveToLocation()
    },

    //点击搜索获取附近的点
    bindBtn: function () {
        // this.showmarkers(),
        app.globalData.name=this.data.name,
        console.log("当前地址为"+this.data.name),
        // console.log("当前地址为"+app.globalData.name),
        wx.redirectTo({
            key: 'address',
            url:'/pages/index/index',
            success:function(){
                var address=this.data.name;
                wx.setStorageSync('address', address);
            }
        })
    },

    //请求附近的点
    showmarkers: function () {
        var that = this;

        //数据加载完成之前，显示加载中提示框
        wx.showToast({
            title: '正在请求附近的点。。。',
            icon: 'loading',
            duration: 5000
        });
        wx.request({
            url: 'https://raw.githubusercontent.com/orangeC/wxapp-1/master/data/data.json', 
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                var data = res.data;
                console.log(data)
                that.setData({
                    markers: data
                })
                wx.hideToast();
            }
        })
    },
    
    //获取中间点的经纬度，并mark出来
    getLngLat: function () {
        var that = this;
        this.mapCtx.getCenterLocation({
            success: function (res) {

                that.setData({
                    longitude: res.longitude
                    , latitude: res.latitude
                    , markers: [
                        {
                            id: 6
                            , iconPath: "/images/u147.png"
                            , longitude: res.longitude
                            , latitude: res.latitude
                            , width: 30
                            , height: 30
                            , alpha: 10
                        }
                    ]
                })
                console.log("经度" + that.data.longitude)
                console.log("纬度" + that.data.latitude)
            }
        })
    },
    bindtel: function () {
        wx.getSystemInfo({
            success: function (res) {
                console.log("手机型号 " + res.model)
                console.log("设备像素比 " + res.pixelRatio)
                console.log("窗口宽度 " + res.windowWidth)
                console.log("窗口高度 " + res.windowHeight)
                console.log("微信设置的语言 " + res.language)
                console.log("微信版本号 " + res.version)
                console.log("客户端平台 " + res.platform)
            }
        })
    }
})
