//logs.js
var app = getApp()
Page({
  data: {
    title: "",
    Category: "请选择服务类型",
    name: "",
    phone: "",
    address: "您的地理位置",
    scope: "",
    description: "",
    hidden: true,
    intro: false,
    Head: "/images/u567a.png",
    submit: false,
    switchTab: 1,
    checkbox: true
  },
  onLoad: function () {

    var that = this;
    //调用API从本地缓存中获取数据user
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          clientid: res.data.ClientCode
        });
      }
    });

  },
  onReady: function () {
    var that = this;


    //获得某个商家
    app.send("http://radar.3vcar.com/shop/load/", { code: that.data.clientid }, "GET", function (res) {
      if (res.data) {
        console.log(res);
        var data = res.data;
        console.log(that.data.clientid)
        console.log(data)
        that.setData({
          Head: data.Head,
          name: data.Name,
          phone: data.Phone,
          address: data.Address,
          Latitude: data.Latitude,
          Longitude: data.Longitude,
          Category: data.Category,
          scope: data.Scope,
          description: data.Description,
          code: data.Code,
          type: data.Type
        })
        wx.setNavigationBarTitle({ title: "编辑信息" });
      } else {
        that.setData({ submit: false })
        wx.showToast({
          title: '您还未注册',
          icon: 'loading',
          duration: 3000,
        })
      }


      //获取内存中data 的 RequestData
      var RequestData = app.globalData.data.RequestData;
      console.log(RequestData);
      //将获取到的 RequestData 编码换成对应的name
      for (var i = 0; i < RequestData.length; i++) {
        if (RequestData[i].code == that.data.Category) {
          that.setData({
            Category: RequestData[i].name
          });
          break;
        }
      };

      //设置type
      var types = { "Business": 1, "Client": 2, "Other": 3 };
      that.setData({
        switchTab: types[that.data.type]
      })

    })


  },
  onShow: function () {
    console.log("onshow");
    var that = this;
    //调用API从本地缓存中获取数据data
    wx.getStorage({
      key: 'data',
      success: function (res) {
        var RequestData = res.data.RequestData;
        console.log(RequestData);
        //将获取到的 RequestData 编码换成对应的name
        for (var i = 0; i < RequestData.length; i++) {
          if (RequestData[i].code == that.data.Category) {
            that.setData({
              Category: RequestData[i].name
            });
            break;
          }
        };
      }
    });


  },

  // 点击选择类型
  touchlist: function (event) {
    wx.navigateTo({
      url: '/pages/category/category'
    })
  },
  checkboxChange: function () {
    this.setData({ checkbox: !this.data.checkbox })
  },
  formSubmit: function (e) {
    var that = this;
    if (this.data.checkbox) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var eDetail = e.detail.value;
      var apply = that.data;
      console.log("code : " + apply.code)
      console.log("name名字： " + eDetail.name)
      console.log("head图片： " + apply.Head)
      console.log("phone电话： " + eDetail.phone)
      console.log("address地址： " + apply.address)
      console.log("latitude纬度： " + apply.Latitude)
      console.log("longitude经度： " + apply.Longitude)
      console.log("category类型： " + apply.Category)
      console.log("type： " + apply.type)
      console.log("client编码： " + apply.clientid)
      console.log("description描述： " + eDetail.description)
      console.log("scope范围： " + eDetail.scope)
      app.send("http://radar.3vcar.com/shop/save/",
        {
          code: apply.code,
          name: eDetail.name,
          head: apply.Head,
          phone: eDetail.phone,
          address: apply.address,
          longitude: apply.Longitude,
          latitude: apply.Latitude,
          category: apply.Category,
          type: apply.type,
          client: apply.clientid,
          description: eDetail.description,
          scope: eDetail.scope
        }
        , "POST", function (res) {
          console.log(res)
        })
    } else {
      wx.showToast({
        title: "您还未阅读协议！",
        icon: 'loading',
        duration: 1000
      })
      return;
    }
  },
  formReset: function () {
    console.log("重置")
  },
  //点击头像开始上传
  upload: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
          wx.uploadFile({
            url: 'http://image.3vcar.com/file/uploadwx/', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            success: function (res) {
              console.log(res)
              if (res.statusCode != 200) {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return;
              }
              var data = res.data
              var a = JSON.parse(data)[0].origin;
              console.log(a)
              that.setData({  //上传成功修改显示头像
                Head: "http://image.3vcar.com" + a
              })
            },

            fail: function (e) {
              console.log(e);
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            },
            complete: function () {
              wx.hideToast();  //隐藏Toast
            }
          })

      },

    })
  },
  serviceOne: function () {
    this.setData({ switchTab: 1, type: "Business" })
    console.log(this.data.type)
  },
  serviceTwo: function () {
    this.setData({ switchTab: 2, type: "Client" })
    console.log(this.data.type)
  },
  serviceThree: function () {
    this.setData({ switchTab: 3, type: "Other" })
    console.log(this.data.type)
  },
  //获取位置
  bindPosition: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          fail: function () {
            console.log("地图没出来")
          },
          success: function (res) {
            var address = res.address
            var latitude = res.latitude
            var longitude = res.longitude
            that.setData({
              address: address,
              Latitude: latitude,
              Longitude: longitude
            })
            console.log("纬度" + that.data.Latitude)   //经纬度
            console.log("经度" + that.data.Longitude)
            console.log("地址" + that.data.address)
          }
        })
      }
    })
  }
})
