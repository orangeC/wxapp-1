// pages/fenlei/fenlei.js
//获取应用实例
var app = getApp();
Page({
  data: {
    obj:{},
    listOne:{},
    levelOneList:[],
    levelTwoList:[],
    levelThreeList:[],
    levelOne:'',
    levelTwo:'',
    levelThree:'',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition:false
  },
    onLoad: function () {
      console.log("onLoad");
      var that = this;
      wx.request( {
              url:"http://radar.3vcar.com/category/all/",//获取分类
              data: {
              },
              header: {
                  'Content-Type': 'application/json'
              },
              method:'GET',
              success: function (res) {
                  that.setData({
                    obj: res.data
                  })
                  console.log(res)
              }
      });
      
      console.log('初始化完成');
  },
  onShow:function(){
      var that = this;
      var arr=new Array();
      for(var i=0;i<60;i++){
        if(this.data.obj[i].code.length==3){
            arr = this.data.obj[i]
            this.setData({
              listOne:arr
            })
        }
      };
       console.log(arr)
       console.log('onLaunch')
  },

  bindtap:function(){
      var arr=new Array();
      for(var i=0;i<60;i++){
        if(this.data.obj[i].code.length==3){
            arr = this.data.obj[i]
            this.setData({
              listOne:arr
            })
            console.log(arr)
        }
      };
  },
  open:function(){
    this.setData({
      condition:!this.data.condition
    })
  },

})