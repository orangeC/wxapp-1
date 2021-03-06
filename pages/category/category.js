//获取应用实例
var app = getApp();
var common = require("../../utils/common.js");
Page({
  data: {
    shop: {},
    listOne: {},
    listTwo: {},
    listThree: {},
    arr: [],
    arr2: [],
    id: 0,
    code: "",
    option: '全部商家',
    option2: '综合排序',
    distance: "距离最近",
    likeAmount: '点赞最多',
    cat: false,
    sort: false
  },
  onLoad: function () {
    console.log("onLoad");
    var that = this;
    wx.request({
      url: "http://radar.3vcar.com/category/all/",//获取分类
      data: {
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          obj: res.data
        });
        console.log(res);
      }
    });
    //获取从API中缓存的shop
    var shop = app.globalData.shop;
    console.log(shop);
    that.setData({
      shop:shop
    });
    console.log(shop[0].type);
    console.log('初始化完成');
  },

  // 隐藏模态框
  hideModal() {
    this.setData({ modalShowStyle: "" });
  },

  bindKeyInput: function (e) {
    console.log(e.detail.value
    )
  },

  // 点击显示模拟框按钮
  touchlist: function (e) {
    this.setData({
      modalShowStyle: "opacity:1;pointer-events:auto;"
    });
    var arr = new Array();
    for (var i = 0; i < 60; i++) {
      if (this.data.obj[i].code.length == 3) {
        arr.push(this.data.obj[i])
        console.log(this.data.obj[i])
      } else {
      }
      this.setData({
        listOne: arr,
        sort: false,
        cat: true
      })
    };
  },

  sort: function () {
    this.setData({
      modalShowStyle: "opacity:1;pointer-events:auto;",
      cat: false,
      sort: true
    })
  },

  touchlisthide: function () {
    // this.hideModal();
  },

  touchList2: function (e) {
    var arr2 = new Array();
    for (var i = 0; i < 60; i++) {
      if (this.data.obj[i].code.length == 6 && this.data.obj[i].code.substring(0, 3) == e.currentTarget.dataset.id) {
        arr2.push(this.data.obj[i])
      };
      console.log("arr2" + arr2)
      this.setData({
        listTwo: arr2,
        switchOne: true,
        switchTwo: false
      })
    };
  },

  touchList3: function (e) {
    var arr3 = new Array();
    for (var i = 0; i < 60; i++) {
      if (this.data.obj[i].code.length == 9 && this.data.obj[i].code.substring(0, 6) == e.currentTarget.dataset.gid) {
        arr3.push(this.data.obj[i])
      };
      console.log("arr3" + arr3)
      this.setData({
        listThree: arr3,
        switchTwo: true,
      })
    }
  },
  testbind: function (e) {
    // console.log(e.currentTarget.id)
    this.hideModal();
    console.log("当前选择的商家种类code为", e.currentTarget.dataset.code)
    this.setData({
      option: e.currentTarget.id,
      category: e.currentTarget.dataset.code
    })
    if (this.data.category) {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        Category: this.data.category
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },

  testbind2: function (e) {
    this.setData({
      option2: e.currentTarget.id
    }),
      this.hideModal();
  }
})
