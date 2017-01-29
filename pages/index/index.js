//index.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
  data: {
    showList:[
      {title:"帮家博士",ser:"保洁1",distance:"100m",heart:"1"},
      {title:"帮家博士2",ser:"保洁2",distance:"200m",heart:"2"},
      {title:"帮家博士3",ser:"保洁3",distance:"300m",heart:"3"},
      {title:"涂家换新4",ser:"保洁4",distance:"400m",heart:"4"},
      {title:"帮家博士5",ser:"保洁5",distance:"500m",heart:"5"},
      {title:"衣保姆6",ser:"保洁6",distance:"600m",heart:"6"}
    ],
    name:"",
    address:"",
    latitude:"",
    longitude:""
  },
  //事件处理函数
  
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
    
  },
  bindKeyInput:function(e){
    console.log(e.detail.value
)
  }
  
})
