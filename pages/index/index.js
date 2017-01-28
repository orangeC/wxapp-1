//index.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
  data: {
    showList:[
      {title:"帮家博士",ser:"保洁1",distance:"100m",heart:"1",tel:"123",address:"第一大街",content:"contentone"},
      {title:"帮家博士2",ser:"保洁2",distance:"200m",heart:"2",tel:"456",address:"第2大街",content:"contenttwo"},
      {title:"帮家博士3",ser:"保洁3",distance:"300m",heart:"3",tel:"789",address:"第3大街",content:"contentthree"},
      {title:"涂家换新4",ser:"保洁4",distance:"400m",heart:"4",tel:"101112",address:"第4大街",content:"contentfour"},
      {title:"帮家博士5",ser:"保洁5",distance:"500m",heart:"5",tel:"131415",address:"第5大街",content:"contentfive"},
      {title:"衣保姆6",ser:"保洁6",distance:"600m",heart:"6",tel:"161718",address:"第6大街",content:"contentsix"}
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
  bindKeyInput:function(e){
    console.log(e.detail.value
)
  }
  
})
