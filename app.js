var send = require('./utils/request.js');
//app.js
App({
  send: send.send,
  onLaunch: function () {
    var that = this;

    // 获取小程序登录凭证并缓存
    this.getClientData();
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          that.send("/wechat/token", { code }, "GET", function (res) {
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
                    that.globalData.thatCode = res.data.code;
                    console.log("login");
                  } else {
                    that.globalData.clientType = 'visit';
                    console.log("visit");
                  }
                },
              );
            }
          })

        }
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
  onShow: function () {
    var that = this;
    that.globalData.arrData = [];
    that.send("/shop/category",{code:"all"},"GET",function(res){
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].tier == "1"){
          that.globalData.arrData.push(res.data[i].name)
        }
      }
    })
  },
  globalData: {
    user: {},
    data: {},
    clientType: '',
    latitude:'',
    longitude:'',
    codeIndex:'',
    arrData:[]
  }

})
