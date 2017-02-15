//logs.js
var app = getApp()
Page({
  data: {
    title: "商家入驻",
    shopStatus: true,
    Category: "",
    name: "请输入名称",
    phone: "请输入电话",
    address: "您的地理位置",
    scope: "服务范围",
    description: "请详细的描述",
    hidden: false,
    intro: false,
    tab: false,
    Head: "",
    switchTab: 1,
    arr:[{name:"哈"},{name:"喽"}],
    modalShowStyle: "",
    navShowStyleOne: "",
    navShowStyleTwo: "",
    navShowStyleThree: "",
    navShowStyleFour: "",
    switchOne: true,
    switchTwo: false,
    switchThree: false,
    switchFour: false,
    storeOne: "全部商家1",
    storeTwo: "日常保洁",
  },
  onLoad: function () {
    var that = this;

    //调用缓存获得clientcode
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({ clientid: res.data.ClientCode });
        console.log(that.data.clientid)
        console.log("上一行商家页面拿到的缓存中的user")
      }
    })


    // if (!this.data.shopStatus) {
    //   wx.navigateTo({
    //     url: '../offer/offer'
    //   })
    // }
  },
  onReady: function () {
    var that = this;

    wx.setNavigationBarTitle({ title: this.data.title });
    //获得某个商家
    app.send("http://radar.3vcar.com/shop/load/", { code: that.data.clientid }, "GET", function (res) {
      var data = res.data;
      console.log(data)
      that.setData({ tab: true, Head: data.Head, name: data.Name, phone: data.Phone, address: data.Address, Latitude: data.Latitude, Longitude: data.Longitude, Category: data.Category, scope: data.Scope, description: data.Description, code: data.Code, type: data.Type })
      console.log(that.data.Category)
      //请求category
      wx.getStorage({
        key: 'data',
        success: function (res) {
          var getData = res.data.RequestData;
          console.log(getData)
          //将获取到的category编码插入wxml
          for (var i = 0; i < getData.length; i++) {
            if(getData[i].code.length == 3){
              // that.data.arr.push(getData[i])
            }
          }
          //将获取到的category编码换成对应的name
          for (var i = 0; i < getData.length; i++) {
            if (getData[i].code == that.data.Category) {
              that.setData({
                Category: getData[i].name
              })
            }
          };
          console.log("上一行商家页面拿到的缓存中的data")
        }
      })

      console.log("看上一行")
      //设置type
      if (that.data.type == "Business") {
        console.log(that.data.type)
        that.setData({ switchTab: 1 })
      }
      else if (that.data.type == "Client") {
        that.setData({ switchTab: 2 })
        console.log(that.data.type)
        console.log(that.data.switchTab)
      }
      else {
        that.setData({ switchTab: 3 })
        console.log(that.data.type)
        console.log(that.data.switchTab)
      }
    })


  },
  onShow: function () {
    var that = this;


    if (this.data.title == "商家入驻") {
      that.setData({
        hidden: true
      })
    }
    console.log("logs page execute: onShow.");

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
        console.log("图片： " + apply.src)
        console.log("电话： " + apply.phone)
        console.log("地址： " + apply.address)
        console.log("纬度： " + apply.Latitude)
        console.log("经度： " + apply.Longitude)
        console.log("type： " + apply.type)
        console.log("编码： " + apply.clientid)
        console.log("描述： " + apply.description)
        console.log("范围： " + apply.scope)
        app.send("http://radar.3vcar.com/shop/save/",
          {
            code: apply.code,
            name: apply.name,
            head: apply.src,
            phone: apply.phone,
            address: apply.address,
            longitude: apply.Longitude,
            latitude: apply.Latitude,
            category: "001001001",
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
                src: "http://image.3vcar.com" + a,
                tab: true
              })
              console.log(that.data.src)
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
              latitude: latitude,
              longitude: longitude
            })
            console.log("纬度" + that.data.latitude)   //经纬度
            console.log("经度" + that.data.longitude)
            console.log("地址" + that.data.address)
          }
        })
      }
    })
  },
  // 点击显示模拟框按钮
  touchlist: function (event) {
    this.setData({
      modalShowStyle: "opacity:1;pointer-events:auto;"
    })
  },
  tapNameOne: function (event) {
    this.setData({
      switchOne: true,
      switchTwo: false,
      switchThree: false,
      switchFour: false
    })
  },
  tapNameTwo: function (event) {
    this.setData({
      switchOne: false,
      switchTwo: true,
      switchThree: false,
      switchFour: false,
      navShowStyleTwo: "background-color: #f7f7f7;",
      navShowStyleOne: "background-color: #e5e5e5;",
      navShowStyleThree: "background-color: #e5e5e5;",
      navShowStyleFour: "background-color: #e5e5e5;"
    })
  },
  tapNameThree: function (event) {
    this.setData({
      switchOne: false,
      switchTwo: false,
      switchThree: true,
      switchFour: false,
      navShowStyleThree: "background-color: #f7f7f7;",
      navShowStyleOne: "background-color: #e5e5e5;",
      navShowStyleTwo: "background-color: #e5e5e5;",
      navShowStyleFour: "background-color: #e5e5e5;"
    })
  },
  tapNameFour: function (event) {
    this.setData({
      switchOne: false,
      switchTwo: false,
      switchThree: false,
      switchFour: true,
      navShowStyleFour: "background-color: #f7f7f7;",
      navShowStyleThree: "background-color: #e5e5e5;",
      navShowStyleOne: "background-color: #e5e5e5;",
      navShowStyleTwo: "background-color: #e5e5e5;"
    })
  },
  testbind: function (e) {
    console.log(e.currentTarget.id)
    this.setData({
      option: e.currentTarget.id
    }),
      this.hideModal();

  },
  // 隐藏模态框
  hideModal() {
    this.setData({ modalShowStyle: "" });
  },
  //请求店家服务类型
  // sendCategory: function () {
  //   this.send("http://radar.3vcar.com/category/all/", {}, "GET", function (res) {
  //     console.log(res)
  //   })
  // },
  onHide: function () {
    // Do something when page hide.
    console.log("logs page execute: onHide.");
  },
  onUnload: function () {
    console.log("logs page execute: onUnload.");
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log("logs page execute: onPullDownRefresh.");
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log("logs page execute: onReachBottom.");
  }
})
