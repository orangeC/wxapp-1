var send = require('./utils/request.js');
var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
//app.js
App({
  send: send.send,
  onLaunch: function () {
    var that = this;
    // 获取小程序登录凭证并缓存
    this.getClientData();
    //获取小程序启动后的GPS,以及腾讯的定位接口获取详细地址
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.globalData.latitude = res.latitude;
        that.globalData.longitude = res.longitude;
        var qqmapsdk = new QQMapWX({
          key: '3PGBZ-GMYKI-ZLXGJ-5T752-BAAZZ-NBFMZ'
        });
        // 腾讯定位接口 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          poi_options: 'policy=2',
          get_poi: 1,
          success: function (res) {
            wx.setStorageSync('address', res.result.address);
          }
        });
      }
    });
  },
  //获取小程序登录凭证并缓存
  getClientData: function () {
    var that = this;
    //获取小程序登录凭证
      wx.login({
        success: function (res) {
          if (res.code) {
            var code = res.code;
            that.send("/wechat/token", { code }, "GET", function (res) {
              that.globalData.user = {
                clientCode: res.data.ClientCode
              };
              if (res.data.Success) {
                that.send(
                  '/wechat/load',
                  {
                    code: res.data.ClientCode,
                  },
                  'GET',
                  function (res) {
                    if (res.data) {
                      that.globalData.clientType = 'login';
                      var code = res.data.code;
                      that.globalData.user.code = res.data.code
                    } else {
                      that.globalData.clientType = 'visit';
                    }
                  },
                );
              }
            })
          }
        }
      });
  },
  onShow: function () {
    var that = this;
    that.globalData.arrData = [];
    that.globalData.arrDataCategory = [];
    that.send("/shop/category", { code: "all" }, "GET", function (res) {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].tier == "1") {
          that.globalData.arrData.push(res.data[i].name)
        };
        that.globalData.arrDataCategory.push(res.data[i])
      }
    })
  },
  globalData: {
    user: {
      clientCode: '',
      clientType: '',
      expiredTime: ''
    },
    data: {},
    clientType: '',
    latitude: '',
    longitude: '',
    address: '',
    codeIndex: '',
    arrData: [],
    arrDataCategory:[]
  }
})
