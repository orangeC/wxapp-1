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
      success: function(res){
        console.log(res);
        that.globalData.latitude = res.latitude;
        that.globalData.longitude = res.longitude;
        var qqmapsdk = new QQMapWX({
            key: '3PGBZ-GMYKI-ZLXGJ-5T752-BAAZZ-NBFMZ'
        });
        // 腾讯定位接口 调用接口
        qqmapsdk.reverseGeocoder({
            location:{
              latitude:res.latitude,
              longitude:res.longitude
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

    //初始化user
    var user = wx.getStorageSync('user') || {};
    // 获取当前时间戳(以s为单位)
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    console.log("当前时间戳为：" + timestamp);
    console.log("到期时间戳为：" + user.ExpiredTime)
    var time = user.ExpiredTime - timestamp
    console.log("时间差为：" + time)

    //获取小程序登录凭证
    if (!user.ClientCode || (timestamp > user.ExpiredTime)) {

      wx.login({
        success: function (res) {
          if (res.code) {
            console.log("code " + res.code)
            var code = res.code;
            that.send("/wechat/token", { code }, "GET", function (res) {
              console.log(res)
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
                      that.globalData.user = {
                        code: res.data.code
                      }
                      wx.setStorageSync('code', code);
                      console.log("login");
                    } else {
                      that.globalData.clientType = 'visit';
                      console.log("visit");
                    }
                  },
                );
              }
              console.log(res)
              console.log(res.data.ClientCode)
              console.log(res.data.ExpiredTime)
              console.log(res.errMsg)
              // 获取到期的时间戳
              var stringTime = res.data.ExpiredTime;
              var timestamp2 = Date.parse(new Date(stringTime));
              timestamp2 = timestamp2 / 1000;
              // 
              console.log(stringTime + "的时间戳为：" + timestamp2);
              that.globalData.ClientCode = res.data.ClientCode;
              var obj = {
                ClientCode: res.data.ClientCode,
                ExpiredTime: timestamp2
              };
              console.log(obj);
              wx.setStorageSync('user', obj);//存储openid

            })
          }
        }
      });
    } else {
      var that = this;
      var clientAppid = wx.getStorageSync("user");
      var clientCode = wx.getStorageSync("code");
      this.globalData.user = {
        clientCode: clientAppid.ClientCode
      };
      if (clientCode) {
        this.globalData.user = {
          code: clientCode
        };
      } else {
        this.send(
          '/wechat/load',
          {
            code: clientAppid.ClientCode,
          },
          'GET',
          function (res) {
            if (res.data) {
              that.globalData.user.code = res.data.code;
            }
          },
        );
      }

      console.log(this.globalData)
    }
  },
  onShow: function () {
    console.log(this.globalData.user.clientCode)
    var that = this;
    that.globalData.arrData = [];
    that.send("/shop/category", { code: "all" }, "GET", function (res) {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].tier == "1") {
          that.globalData.arrData.push(res.data[i].name)
        }
      }
    })
  },
  getUser: function () {
    if (!this.globalData.user.code) {
      this.getClientData();
    } else {
      return
    }
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
    address:'',
    codeIndex: '',
    arrData: []
  }

})
