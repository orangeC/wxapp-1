var city = require('../../../utils/city.js');
var app = getApp();
Page({
  data: {
    brands: [],
    brand: '',
    searchLetter: [],
    isShowLetter: false,
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    scrollTop: 0,
    styleHidden: true
  },
  onLoad: function (options) {
    var dataBrand = city.getCity();
    this.setData({
      brand: dataBrand,
      options: options.data
    })
  },
  onReady: function () {
    var that = this;
    wx.showToast({
      title: '玩命加载中。。。',
      icon: 'loading',
      duration: 10000,
      success: function () {
        var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
        // 获取系统信息
        var sysInfo = wx.getSystemInfoSync();
        var winHeight = sysInfo.windowHeight;
        //添加要匹配的字母范围值
        var itemH = winHeight / searchLetter.length;
        var tempObj = [];
        for (var i = 0; i < searchLetter.length; i++) {
          var temp = {};
          temp.name = searchLetter[i];
          temp.tHeight = i * itemH;
          temp.bHeight = (i + 1) * itemH;
          tempObj.push(temp)
        };
        var groups = [];
        for (var i = 0; i < searchLetter.length; i++) {
          var group = {
            initial: searchLetter[i],
            brands: []
          };
          for (var j = 0; j < that.data.brand.length; j++) {
            var brand = that.data.brand[j];
            if (group.initial == brand.initial) {
              brand.json = JSON.stringify(brand);
              group.brands.push(brand);
            }
          }
          groups.push(group);
          that.setData({
            winHeight: winHeight,
            itemH: itemH,
            searchLetter: tempObj,
            brands: groups
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败请重新加载',
          icon: 'loading',
          duration: 1500,
        })
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },

  searchStart: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this, showLetter);
    this.nowLetter(pageY, this);
    this.setData({
      showLetter: showLetter,
      startPageY: pageY,
      isShowLetter: true,
    })
  },

  searchMove: function (e) {
    var pageY = e.touches[0].pageY;
    var startPageY = this.data.startPageY;
    var tHeight = this.data.tHeight;
    var bHeight = this.data.bHeight;
    var showLetter = 0;
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) {
        this.nowLetter(pageY, this);
      }
    }
  },
  searchEnd: function (e) {
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  nowLetter: function (pageY, that) {
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }
    this.setScrollTop(that, showLetter);
    that.setData({
      bHeight: bHeight,
      tHeight: tHeight,
      showLetter: showLetter,
      startPageY: pageY
    })
  },

  bindScroll: function (e) {
  },
  setScrollTop: function (that, showLetter) {
    var scrollTop = 0;
    var brands = that.data.brands;
    var brandCount = 0;
    var initialCount = 0;
    for (var i = 0; i < brands.length; i++) {
      if (showLetter == brands[i].initial) {
        scrollTop = initialCount * 30 + brandCount * 41;
        break;
      } else {
        initialCount++;
        brandCount += brands[i].brands.length;
      }
    }
    that.setData({
      scrollTop: scrollTop
    })
  },

  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //模态框
  setModalStatus: function (e) {
    var arrData = [];
    if (this.data.options) {
      var objData = {};
      objData.name = "全部区域";
      arrData = city.getDistrict(e.currentTarget.dataset.id);
      arrData.unshift(objData);
    } else {
      arrData = city.getDistrict(e.currentTarget.dataset.id);
    }
    this.setData({
      style: arrData
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200);
    var eCity = JSON.parse(e.currentTarget.dataset.json).name;
    this.setData({
      eCity: eCity
    })
  },

  brandStyle: function (e) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    for (var i = 0; i < this.data.style.length; i++) {
      if (this.data.style[i].code == e.currentTarget.dataset.code) {
        if (this.data.options) {
          if (this.data.style[i].name == "全部区域") {
            prevPage.setData({
              scope: this.data.eCity + " ‒ " + this.data.style[i].name
            })
            app.globalData.noPass.scope = this.data.eCity + " ‒ " + this.data.style[i].name
          } else {
            prevPage.setData({
              scope: this.data.style[i].name
            })
            app.globalData.noPass.scope = this.data.style[i].name
          }
        } else {
          prevPage.setData({
            area: this.data.style[i].name,
            city: this.data.style[i].code
          })
          app.globalData.noPass.city = this.data.style[i].name;
        }
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      }
    }
    wx.navigateBack({
      delta: 1
    });
  },
})