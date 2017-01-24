//index.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
  data: {
    showList:[
      {title:"帮家博士",ser:"保洁",distance:"499m"},
      {title:"涂家换新",ser:"装修",distance:"200m"},
      {title:"涂家换新",ser:"装修",distance:"200m"},
      {title:"涂家换新",ser:"装修",distance:"200m"},
      {title:"涂家换新",ser:"装修",distance:"200m"},
      {title:"衣保姆",ser:"干洗",distance:"200m"}
    ],
    name:"",
    address:"",
    latitude:"",
    longitude:""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //获取位置
  bindWeizhi: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          fail:function(){
            console.log("地图没出来")
          },
          success:function(res){
            var name = res.name
            var address = res.address
            var latitude = res.latitude
            var longitude = res.longitude
            that.setData({
              name: name,
              address: address,
              latitude:latitude,
              longitude:longitude
            })
            console.log(that.data.latitude)   //经纬度
            console.log(that.data.longitude)
          }
        })
        // wx.openLocation({
        //   latitude: latitude,
        //   longitude: longitude,
        //   scale: 28
        // })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    app.globalData.userInfo = "i am in index.js";
    console.log(app.globalData.userInfo)
  },
  onHide: function () {
    common.sayHello("看这");
    common.sayGoodbye("再见")
  }
})
