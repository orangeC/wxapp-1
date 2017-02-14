//index.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js")
Page({
  data: {
    showList:[
      {title:"帮家博士1",ser:"保洁1",distance:"100m",heart:"1",src:"../../images/b.jpg"},
      {title:"帮家博士2",ser:"保洁2",distance:"200m",heart:"2",src:"../../images/t.png"},
      {title:"帮家博士3",ser:"保洁3",distance:"300m",heart:"3",src:"../../images/y.png"},
      {title:"涂家换新4",ser:"保洁4",distance:"400m",heart:"4",src:"../../images/b.jpg"},
      {title:"帮家博士5",ser:"保洁5",distance:"500m",heart:"5",src:"../../images/t.png"},
      {title:"衣保姆6",ser:"保洁6",distance:"600m",heart:"6",src:"../../images/y.png"}
    ],
    name:"",
    address:"",
    latitude:0,
    longitude:0
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
    console.log('onLoad');
    var that = this;
    // app.send("http://radar.3vcar.com//shop/search/")
  },
  bindKeyInput:function(e){
    console.log(e.detail.value
)
  }
  
})
