//logs.js
var app = getApp()
Page({
  data: {
    title: "",
    Category: "请选择服务类型",
    name: "请输入名称",
    phone: "请输入电话",
    address: "您的地理位置",
    scope: "服务范围",
    description: "请详细的描述",
    hidden: true,
    intro: false,
    tab: false,
    Head: "",
    submit: false,
    switchTab: 1
  },
  onLoad: function () {

    var that = this;
    //获取内存中user 的 ClientCode
    var ClientCode = app.globalData.user.ClientCode;
    console.log(ClientCode);
    that.setData({
      clientid: ClientCode
    });
  },
  onReady: function () {
    var that = this;


    //获得某个商家
    app.send("http://radar.3vcar.com/shop/load/", { code: that.data.clientid }, "GET", function (res) {
      if (res) {
        var data = res.data;
        console.log(that.data.clientid)
        console.log(data)
        that.setData({
          tab: true,
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
          type: data.Type,
          submit: true
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
      that.setData({ switchTab: types[that.data.type] })
      // if (that.data.type == "Business") {
      //   console.log(that.data.type)
      //   that.setData({ switchTab: 1 })
      // }
      // else if (that.data.type == "Client") {
      //   that.setData({ switchTab: 2 })
      //   console.log(that.data.type)
      //   console.log(that.data.switchTab)
      // }
      // else {
      //   that.setData({ switchTab: 3 })
      //   console.log(that.data.type)
      //   console.log(that.data.switchTab)
      // }
    })


  },
  onShow: function () {
    var that = this;
    // if (this.data.title == "商家入驻") {
    //   that.setData({
    //     hidden: true
    //   })
    // }
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

  },
  //获取输入框名字
  getInputName: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  //获取输入框电话
  getInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  //获取输入框范围
  getInputScope: function (e) {
    this.setData({
      scope: e.detail.value
    })
    console.log(this.data.scope)
  },
  //获取输入框介绍
  getInputDes: function (e) {
    this.setData({
      description: e.detail.value
    })
    console.log(this.data.description)
  },
   // 点击选择类型
  touchlist: function (event) {
    wx.navigateTo({
      url: '/pages/category/category'
    })
  },

  //提交申请
  handlejump: function () {
    var that = this;
    wx.showToast({
      title: '已提交，请等待审核',
      icon: 'loading',
      duration: 3000,
      success: function (res) {
        var apply = that.data
        console.log("code : " + apply.code)
        console.log("名字： " + apply.name)
        console.log("图片： " + apply.Head)
        console.log("电话： " + apply.phone)
        console.log("地址： " + apply.address)
        console.log("纬度： " + apply.Latitude)
        console.log("经度： " + apply.Longitude)
        console.log("类型： " + apply.Category)
        console.log("type： " + apply.type)
        console.log("编码： " + apply.clientid)
        console.log("描述： " + apply.description)
        console.log("范围： " + apply.scope)
        app.send("http://radar.3vcar.com/shop/save/",
          {
            code: apply.code,
            name: apply.name,
            head: apply.Head,
            phone: apply.phone,
            address: apply.address,
            longitude: apply.Longitude,
            latitude: apply.Latitude,
            category: apply.Category,
            type: apply.type,
            client: apply.clientid,
            description: apply.description,
            scope: apply.scope
          }
          , "POST", function (res) {
            console.log(res)
          })
        setTimeout(function () {
          wx.hideToast()
          wx.switchTab({
            url: '/pages/index/index'
          })
        }, 3000)
      }

    });

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
                Head: "http://image.3vcar.com" + a,
                tab: true
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
