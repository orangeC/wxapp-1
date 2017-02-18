var send = require('./utils/request.js');
//app.js
App({
  send: send.send,
  onLaunch: function () {
    var that = this;

    //获取小程序登录凭证并缓存
    this.getClientData();
    //请求店家服务类型
    this.sendCategory();
    //获取商家列表
    this.getShopList();
    //调用API从本地缓存中获取数据user
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.globalData.user = res.data;
      }
    });
    //调用API从本地缓存中获取数据data
    wx.getStorage({
      key: 'data',
      success: function (res) {
        that.globalData.data = res.data;
      }
    });
    //调用API从本地缓存中获取数据shop
    wx.getStorage({
      key: 'shop',
      success: function (res) {
        that.globalData.shop = res.data;
      }
    });
    console.log(this.globalData)    
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

        var data = {
          RequestData: res.data,
          ExpiredTime: time2
        };
        console.log(data);
        wx.setStorageSync('data', data);//存储请求来的category
      })
    }
  },

  //获取商家列表
  getShopList:function(){
    var that=this;
    wx.request({
      url: 'http://radar.3vcar.com/shop/search/',//获取所有商家
      data: {
        name: '',
        longitude: 117.52412,
        latitude: 38.98755,
        category: "",
        distance: 100000
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'
      },    // 设置请求的 header
      success: function(res){
        var shop=res.data;
        wx.setStorageSync('shop', shop);
        console.log('获取到的商店：',shop)
      },
      fail: function() {
        console.log('error!')
      },
      complete: function() {
        // complete
      }
    })
  },

  globalData: {
    user: {},
    data: {}
  }

})