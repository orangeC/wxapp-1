//logs.js
var city = require('../../utils/city.js');
var app = getApp()
Page({
  data: {
    comment: "",
    title: "",
    category: ["您还未选择一类类别"],
    index: 0,
    name: "",
    phone: "",
    area: "请选择您的区域",
    address: "请选择您的地址",
    scope: "请选择服务范围",
    description: "请写下描述",
    intro: false,
    Head: "/images/photo.png",
    submit: false,
    switchTab: 1,
    checkbox: true,
    categoryName: "",
    categoryNormal: "请输入类型",
    categoryCode: [],
    containerOffer: true,
    addressOffer: '',
    categoryOffer: '',
    codeOffer: '',
    headOffer: '',//头像图片
    latitudeOffer: '',
    longitudeOffer: '',
    likedOffer: '',
    nameOffer: '',
    phoneOffer: '',
    markersOffer: '',
    descriptionOffer: ''
  },
  onLoad: function () {
    var that = this;
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading',
      duration: 10000,
      success: function () {
        var dataCity = city.getCity();
        //调用API从本地缓存中获取数据user
        var clientid = wx.getStorageSync("user");
        if (!app.globalData.clientType) {
          wx.showToast({
            title: '网络请求错误',
            icon: 'loading',
            duration: 2000,
          })
        } else {
          if (app.globalData.clientType == "visit") {
            that.setData({
              clientid: clientid.ClientCode,
            })
            return;
          } else {
            //获得某个商家
            app.send("/wechat/load", { code: clientid.ClientCode }, "GET", function (res) {
              wx.showToast({
                title: '玩儿命加载中。。',
                icon: 'loading',
                duration: 5000,
                success: function () {
                  if (res.data.status == "Authenticated") {
                    that.setData({ submit: true, containerOffer: false })
                    var data = res.data;
                    console.log(data);
                    that.setData({
                      comment: data.comment,
                      clientid: clientid.ClientCode,
                      Head: data.head,
                      name: data.name,
                      phone: data.phone,
                      area: data.city,
                      address: data.address,
                      Latitude: data.latitude,
                      Longitude: data.longitude,
                      scope: data.scope,
                      description: data.description,
                      code: data.code,
                      status: data.status
                    })
                    if (data.category) {
                      app.send("/shop/category", { code: "all" }, "GET", function (res) {
                        var arrSome = [];
                        for (var i = 0; i < res.data.length; i++) {
                          if (res.data[i].code == data.category) {
                            that.setData({
                              categoryName: res.data[i].name,
                              categoryNormal: data.category
                            })
                          }
                          if ((data.category.slice(0, 3) == res.data[i].code.slice(0, 3)) && (res.data[i].tier == 2)) {
                            arrSome.push(res.data[i]);
                          }

                        }
                        for (var i = 0; i < arrSome.length; i++) {
                          if (arrSome[i].code == data.category) {
                            that.setData({ index: i })
                          }
                        }

                        //前3位(设置状态)
                        that.setData({
                          categorySlice: data.category.slice(0, 3)
                        })

                      })
                    };
                    wx.setNavigationBarTitle({ title: "编辑信息" });
                  } else if (res.data) {
                    var data = res.data;
                    console.log(data);
                    that.setData({
                      comment: data.comment,
                      clientid: clientid.ClientCode,
                      Head: data.head,
                      name: data.name,
                      phone: data.phone,
                      area: data.city,
                      address: data.address,
                      Latitude: data.latitude,
                      Longitude: data.longitude,
                      scope: data.scope,
                      description: data.description,
                      code: data.code,
                      status: data.status
                    })
                    if (data.category) {
                      app.send("/shop/category", { code: "all" }, "GET", function (res) {
                        var arrSome = [];
                        for (var i = 0; i < res.data.length; i++) {
                          if (res.data[i].code == data.category) {
                            that.setData({
                              categoryName: res.data[i].name,
                              categoryNormal: data.category
                            })
                          }
                          if ((data.category.slice(0, 3) == res.data[i].code.slice(0, 3)) && (res.data[i].tier == 2)) {
                            arrSome.push(res.data[i]);
                          }

                        }
                        for (var i = 0; i < arrSome.length; i++) {
                          if (arrSome[i].code == data.category) {
                            that.setData({ index: i })
                          }
                        }

                        //前3位(设置状态)
                        that.setData({
                          categorySlice: data.category.slice(0, 3)
                        })

                      })
                    };
                    wx.setNavigationBarTitle({ title: "编辑信息" });
                  } else {
                    wx.showToast({
                      title: '请求数据中',
                      icon: 'loading',
                      duration: 3000,
                    })
                  }
                },
                complete: function () {
                  wx.hideToast();
                }
              })


            })
          }
        }
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  onReady: function () {
    var that = this;
    if (app.globalData.clientType == "login") {
      //获得编辑页商家
      app.send(
        '/shop/load',
        {
          code: app.globalData.user.code,
        },
        'GET',
        function (res) {
          console.log(res.data);
          var apply = res.data;
          var markers = [{
            id: 0,
            iconPath: "../../images/address3.png",
            "latitude": apply.latitude,
            "longitude": apply.longitude,
            width: 30,
            height: 30,
            title: apply.name
          }];
          that.setData({
            addressOffer: apply.address,
            categoryOffer: apply.category,
            codeOffer: apply.code,
            headOffer: apply.head,//头像图片
            latitudeOffer: apply.latitude,
            longitudeOffer: apply.longitude,
            likedOffer: apply.liked,
            nameOffer: apply.name,
            phoneOffer: apply.phone,
            descriptionOffer: apply.description,
            markersOffer: markers,
          })
        },
      );
    } else {
      return;
    }
    if (this.data.status == "Authenticated") {
      this.setData({ comment: null })
    }
    var dataCity = city.getCity();
    // wx.setNavigationBarTitle({ title: this.data.nameOffer });
    var thatCategory = {
      "001": 1,
      "002": 2,
      "003": 3,
    };
    var thatStatus = {
      "Authenticating": "认证中",
      "Authenticated": "已认证",
      "NoPass": "未通过",
      "None": null
    }
    this.setData({
      switchTab: thatCategory[this.data.categorySlice],
      over: thatStatus[this.data.status],
    })
    this.getcategory(this.data.categorySlice);
    wx.showToast({
      title: thatStatus[this.data.status],
      icon: 'loading',
      duration: 1500
    })
    if (this.data.area) {
      for (var i = 0; i < dataCity.length; i++) {
        if (dataCity[i].code == this.data.area) {
          this.setData({
            city: this.data.area,
            area: dataCity[i].name
          })
          break;
        }
      }
    };
  },
  onShow: function () {
    console.log(app.globalData)
    var that = this;
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading',
      duration: 10000,
      success: function () {
        var dataCity = city.getCity();
        //调用API从本地缓存中获取数据user
        var clientid = wx.getStorageSync("user");
        that.setData({ clientid: clientid.ClientCode })
        //获得某个商家
        app.send("/wechat/load", { code: clientid.ClientCode }, "GET", function (res) {
          console.log(res)
          wx.showToast({
            title: '玩儿命加载中。。',
            icon: 'loading',
            duration: 5000,
            success: function () {
              if (res.data) {
                if (res.data.status == "Authenticated") {
                  that.setData({ submit: true, containerOffer: false })
                  wx.showToast({
                    title: "已认证",
                    icon: 'loading',
                    duration: 2000,
                    success: function () {
                      //获得编辑页商家
                      app.send(
                        '/shop/load',
                        {
                          code: app.globalData.user.code,
                        },
                        'GET',
                        function (res) {

                          console.log(res.data);
                          var apply = res.data;
                          var markers = [{
                            id: 0,
                            iconPath: "../../images/address3.png",
                            "latitude": apply.latitude,
                            "longitude": apply.longitude,
                            width: 30,
                            height: 30,
                            title: apply.name
                          }];
                          that.setData({
                            addressOffer: apply.address,
                            categoryOffer: apply.category,
                            codeOffer: apply.code,
                            headOffer: apply.head,//头像图片
                            latitudeOffer: apply.latitude,
                            longitudeOffer: apply.longitude,
                            likedOffer: apply.liked,
                            nameOffer: apply.name,
                            phoneOffer: apply.phone,
                            descriptionOffer: apply.description,
                            markersOffer: markers,
                          })
                        },
                      );
                    },
                    complete: function () {
                      wx.hideToast()
                    }
                  })

                } else if (res.data.status == "NoPass") {
                  that.setData({ submit: false, containerOffer: true })
                  wx.showToast({
                    title: "未通过",
                    icon: 'loading',
                    duration: 2000,
                    success: function () {
                      var data = res.data;
                      console.log(data);
                      that.setData({
                        comment: data.comment,
                        clientid: clientid.ClientCode,
                        Head: data.head,
                        name: data.name,
                        phone: data.phone,
                        area: data.city,
                        address: data.address,
                        Latitude: data.latitude,
                        Longitude: data.longitude,
                        scope: data.scope,
                        description: data.description,
                        code: data.code,
                        status: data.status,
                        over: "未通过"
                      })
                      for (var i = 0; i < dataCity.length; i++) {
                        if (dataCity[i].code == that.data.area) {
                          that.setData({
                            city: that.data.area,
                            area: dataCity[i].name
                          })
                          break;
                        }
                      }
                      if (data.category) {
                        app.send("/shop/category", { code: "all" }, "GET", function (res) {
                          var arrSome = [];
                          for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i].code == data.category) {
                              that.setData({
                                categoryName: res.data[i].name,
                                categoryNormal: res.data[i].name
                              })
                            }
                            if ((data.category.slice(0, 3) == res.data[i].code.slice(0, 3)) && (res.data[i].tier == 2)) {
                              arrSome.push(res.data[i]);
                            }

                          }
                          for (var i = 0; i < arrSome.length; i++) {
                            if (arrSome[i].code == data.category) {
                              that.setData({ index: i })
                            }
                          }

                          //前3位(设置状态)
                          that.setData({
                            categorySlice: data.category.slice(0, 3)
                          })

                        })
                      };
                      wx.setNavigationBarTitle({ title: "编辑信息" });
                    },
                    complete: function () {
                      wx.hideToast();
                    }
                  })

                } else if (res.data.status == "Authenticating") {
                  that.setData({ submit: false, containerOffer: true })
                  wx.showToast({
                    title: "认证中",
                    icon: 'loading',
                    duration: 2000,
                    success: function () {
                      var data = res.data;
                      console.log(data);
                      that.setData({
                        comment: data.comment,
                        clientid: clientid.ClientCode,
                        Head: data.head,
                        name: data.name,
                        phone: data.phone,
                        area: data.city,
                        address: data.address,
                        Latitude: data.latitude,
                        Longitude: data.longitude,
                        scope: data.scope,
                        description: data.description,
                        code: data.code,
                        status: data.status,
                        over: "认证中"
                      })
                      for (var i = 0; i < dataCity.length; i++) {
                        if (dataCity[i].code == that.data.area) {
                          that.setData({
                            city: that.data.area,
                            area: dataCity[i].name
                          })
                          break;
                        }
                      }
                      if (data.category) {
                        app.send("/shop/category", { code: "all" }, "GET", function (res) {
                          for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i].code == data.category) {
                              that.setData({
                                categoryNormal: res.data[i].name,
                                cateCode: res.data[i].code
                              })
                            }

                          }
                        })
                      };
                      wx.setNavigationBarTitle({ title: "编辑信息" });
                    },
                    complete: function () {
                      wx.hideToast();
                    }
                  })
                } else {
                  return;
                }
              }
            },
            complete: function () {
              wx.hideToast();
            }
          })


        })
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  checkboxChange: function () {
    this.setData({ checkbox: !this.data.checkbox })
  },
  //获取输入框名字
  getInputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获取输入框电话
  getInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  //获取输入框City
  getInputCity: function (e) {
    wx.navigateTo({
      url: './city/city'
    })
  },
  //获取输入框范围
  getInputScope: function (e) {
    wx.navigateTo({
      url: './city/city?data=666'
    })
  },
  //获取输入框介绍
  getInputDes: function (e) {
    wx.navigateTo({
      url: '/pages/edit/info/info?data=' + this.data.description
    })
  },
  //提交数据
  formSubmit: function (e) {

    if (this.data.status == "Authenticating") {
      wx.showToast({
        title: '您的账户正在认证中，请勿重复提交',
        icon: 'loading',
        duration: 3000
      });
      return;
    } else {
      if (this.data.cateCode) {
        this.setData({
          categoryNormal: this.data.cateCode
        })
      }
    }
    var clientid = wx.getStorageSync("user");
    var that = this;
    //验证
    if (this.data.Head == "/images/photo.png") {
      wx.showToast({
        title: '请上传头像',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.name == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入电话',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.area == undefined) {
      wx.showToast({
        title: '请选择区域',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.address == "请选择您的地址") {
      wx.showToast({
        title: '请选择地址',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.categoryNormal == "请输入类型") {
      wx.showToast({
        title: '请确认类型',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.scope == "请选择服务范围") {
      wx.showToast({
        title: '请确认服务范围',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.description == "请写下描述") {
      wx.showToast({
        title: '请填写服务介绍',
        icon: 'loading',
        duration: 2000
      });
      return;
    };
    if (this.data.checkbox) {
      var apply = that.data;
      app.send("/wechat/save",
        {
          code: apply.code,
          name: apply.name,
          head: apply.Head,
          phone: apply.phone,
          city: apply.city,
          address: apply.address,
          longitude: parseFloat(apply.Longitude),
          latitude: parseFloat(apply.Latitude),
          category: apply.categoryNormal,
          client: apply.clientid,
          description: apply.description,
          scope: apply.scope
        }
        , "POST", function (res) {
          if (res.data.Success) {
            wx.showToast({
              title: '正在提交...',
              icon: 'loading',
              duration: 10000,
              success: function () {
                var dataCity = city.getCity();
                //调用API从本地缓存中获取数据user
                var clientid = wx.getStorageSync("user");
                console.log(clientid);

                //获得某个商家
                app.send("/wechat/load", { code: clientid.ClientCode }, "GET", function (res) {
                  wx.showToast({
                    title: '正在认证中。。',
                    icon: 'loading',
                    duration: 5000,
                    success: function () {
                      if (res.data) {
                        var data = res.data;
                        console.log(data);
                        that.setData({
                          comment: data.comment,
                          clientid: clientid.ClientCode,
                          Head: data.head,
                          name: data.name,
                          phone: data.phone,
                          address: data.address,
                          Latitude: data.latitude,
                          Longitude: data.longitude,
                          scope: data.scope,
                          description: data.description,
                          code: data.code,
                          status: data.status,
                          over: "认证中"
                        })
                        if (that.data.cateCode) {
                          app.send("/shop/category", { code: "all" }, "GET", function (res) {
                            for (var i = 0; i < res.data.length; i++) {
                              if (res.data[i].code == that.data.cateCode) {
                                that.setData({
                                  categoryNormal: res.data[i].name,
                                })
                              }

                            }
                          })
                        }else{
                          return ;
                        }
                        app.globalData.user.code = data.code;
                        wx.showToast({
                          title: '正在认证中。。',
                          icon: 'loading',
                          duration: 1500
                        })
                      } else {
                        wx.showToast({
                          title: '请求错误请重新登录',
                          icon: 'loading',
                          duration: 3000,
                        })
                      }
                    },
                    complete: function () {
                      wx.hideToast();
                    }
                  })


                })

              },
              complete: function () {
                console.log("over")
              }
            })
          } else {
            console.log(res)
          }
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
    this.setData({ switchTab: 1 })
    //获取类型函数
    this.getcategory("001");
    this.getcategoryOne();
  },
  serviceTwo: function () {
    this.setData({ switchTab: 2 })
    //获取类型函数
    this.getcategory("002");
    this.getcategoryOne();

  },
  serviceThree: function () {
    this.setData({ switchTab: 3 })
    //获取类型函数
    this.getcategory("003");
    this.getcategoryOne();
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
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
    var categoryName = this.data.category[this.data.index];
    this.setData({
      categoryName: categoryName,
      categoryNormal: this.data.categoryCode[this.data.index]
    })
  },
  gonotice: function () {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  },
  //函数  获取不同状态下的类型
  getcategory: function (codeNumber) {

    var that = this;
    app.send("/shop/category", { code: "all" }, "GET", function (res) {
      var arrOne = [];
      var arrTwo = [];
      for (var i = 0; i < res.data.length; i++) {
        if ((res.data[i].code.slice(0, 3) == codeNumber) && (res.data[i].tier == 2)) {
          arrOne.push(res.data[i].name);
          arrTwo.push(res.data[i].code);
        }
      }
      that.setData({ category: arrOne, categoryCode: arrTwo });
    })
  },
  //函数  
  getcategoryOne: function () {

    var that = this;
    app.send("/shop/category", { code: "all" }, "GET", function (res) {
      for (var i = 0; i < res.data.length; i++) {
        if (that.data.category[that.data.index] == res.data[i].name) {
          that.setData({ categoryNormal: res.data[i].code });

        }
      }
    })
  },
  //打电话
  toCall: function (call) {
    var that = this;
    var call = call.currentTarget.dataset.id;
    wx.makePhoneCall({
      phoneNumber: call,
      success: function (res) {

      }
    })
  },

  //点赞
  liked: function () {
    console.log(this.data.liked)
    var that = this;
    var client = wx.getStorageSync('user');
    app.send(
      '/wechat/like',
      {
        client: client.ClientCode,
        code: app.globalData.user.code
      },
      'POST',
      function (res) {
        console.log(res);
        if (res.data.Success) {
          that.setData({
            likedOffer: that.data.likedOffer + 1,
          })
        } else {
          wx.showToast({
            title: '已点赞',
            icon: 'loading',
            duration: 2000
          })
        }
      },
    );
  },
  //编辑
  handlejump: function () {
    wx.navigateTo({
      url: '/pages/edit/edit'
    })
  },
  //打开地图
  openMap: function () {
    var that = this;
    wx.openLocation({
      latitude: that.data.latitudeOffer, // 纬度，范围为-90~90，负数表示南纬
      longitude: that.data.longitudeOffer, // 经度，范围为-180~180，负数表示西经
      scale: 28, // 缩放比例
      name: that.data.nameOffer, // 位置名
      address: that.data.addressOffer, // 地址的详细说明
      success: function (res) {

      },
    })
  },
})
