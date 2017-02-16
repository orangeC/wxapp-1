var send = require('./utils/request.js');
//app.js
App({

  send: send.send,
  onLaunch: function () {
    var that = this;
    console.log(send);
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    this.getClientData();
    //请求店家服务类型
    this.sendCategory();
   
  },

  onShow: function () {
    console.log("onshow")
  },
  onHide: function () {
    console.log("我去干点别的")
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //get locationInfo   定位获取当前位置
  getLocationInfo: function (cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
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
    console.log(user.ClientCode)

    //获取小程序登录凭证
    if (!user.ClientCode || (timestamp > user.ExpiredTime)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log("code " + res.code)
            var code = res.code
            that.send("http://radar.3vcar.com/wechat/token", { code }, "GET", function (res) {
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
              var obj = {};
              obj.ClientCode = res.data.ClientCode;
              obj.ExpiredTime = timestamp2;
              console.log(obj);
              wx.setStorageSync('user', obj);//存储openid
              that.globalData.user.ClientCode = obj.ClientCode;
              that.globalData.user.ExpiredTime = obj.ExpiredTime;

              console.log(obj)
              console.log(that.globalData.user)
              console.log("上一行是已经缓存的")
            })
          }
        }
      });
    }
  },
  //请求店家服务类型
  sendCategory: function () {
    var that = this;
    //初始化缓存data
    var data = wx.getStorageSync('data') || {};
    // 获取当前时间戳(以s为单位)
    var time = Date.parse(new Date());

    console.log("当前时间戳为：" + time);

    console.log(data);
    if (!data.RequestData || (time > data.ExpiredTime)) {
      this.send("http://radar.3vcar.com/category/all/", {}, "GET", function (res) {
        console.log(res.data);
        // 获取一天后到期的时间戳
        var time2 = Date.parse(new Date()) + 86400000;
        console.log("一天后时间戳：" + time2);

        var data = {};
        data.RequestData = res.data;
        data.ExpiredTime = time2;
        console.log(data);
        wx.setStorageSync('data', data);//存储请求来的category
      })
    }

  },
  globalData: {
    user: {},
    locationInfo: null,
    category: []
  }

})