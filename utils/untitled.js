// pages/fenlei/fenlei.js
//获取应用实例
var app = getApp();
Page({
  data: {
    obj:"",
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
                  //将获取到的json数据，存在名字叫zhihu的这个数组中
                  that.setData({
                    obj: res.data,
                    //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
                  });
                  console.log(res.data)
              }
      })
      // tcity.init(that);

      var level = this.data.obj;

      const levelOneList = [];
      const levelTwoList = [];
      const levelThreeList = [];

      for(let i=0;i<level.length;i++){
        levelOneList.push(level[i].name);
      }
      console.log('一级完成');
      for (let i = 0 ; i < level[0].code.length; i++) {
        levelTwoList.push(level[0].code[i].name)
      }
      console.log('二级完成');
      for (let i = 0 ; i < level[0].code[0].code.length; i++) {
        levelThreeList.push(cityData[0].code[0].code[i].name)
      }

      that.setData({
        'levelOneList': levelOneList,
        'levelTwoList':levelTwoList,
        'levelThreeList':levelThreeList,
        'levelOne':level[0].name,
        'levelTwo':level[0].code[0].name,
        'levelThree':level[0].code[0].code[0].name
      })
      console.log('初始化完成');
  },

  bindChange: function(e) {
    console.log(e.this.data.obj)
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var level = this.data.obj;
    
    if(val[0] != t[0]){
      console.log('levelOne no ');
      const levelTwoList = [];
      const levelThreeList = [];

      for (let i = 0 ; i < level[val[0]].code.length; i++) {
        levelTwoList.push(level[val[0]].code[i].name)
      }
      for (let i = 0 ; i < level[val[0]].code[0].sub.length; i++) {
        levelThreeList.push(level[val[0]].code[0].sub[i].name)
      }

      this.setData({
        LevelOne: this.data.levelOneList[val[0]],
        levelTwo: level[val[0]].code[0].name,
        levelTwoList:levelTwoList,
        levelThree: level[val[0]].code[0].code[0].name,
        levelThreeList:levelThreeList,
        values: val,
        value:[val[0],0,0]
      })
      
      return;
    }
    if(val[1] != t[1]){
      console.log('levelTwo no');
      const levelThreeList = [];

      for (let i = 0 ; i < level[val[0]].code[val[1]].sub.length; i++) {
        levelThreeList.push(level[val[0]].code[val[1]].sub[i].name)
      }
      
      this.setData({
        levelTwo: this.data.levelTwoList[val[1]],
        levelThree: level[val[0]].code[val[1]].code[0].name,
        levelThreeList:levelThreeList,
        values: val,
        value:[val[0],val[1],0]
      })
      return;
    }
    if(val[2] != t[2]){
      console.log('levelThree no');
      this.setData({
        levelThree: this.data.levelThreeList[val[2]],
        values: val
      })
      return;
    }
    

  },
  open:function(){
    this.setData({
      condition:!this.data.condition
    })
  },

})