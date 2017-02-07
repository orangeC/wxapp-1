function initSubMenuDisplay() {
	return ['hidden', 'hidden', 'hidden'];
}

var app = getApp()
var $=require('../../utils/util.js')
Page({
  data:{
      subMenuDisplay:initSubMenuDisplay()
  },
  
  onReady: function() {
        //初始化数据
        this.getData();
    },
    //加载数据
  getData:function(callback){
        var self=this;
        
        // wx.showToast({
        //   title: '加载中...',
        //   icon: 'loading',
        //   duration:10000
        // });
        wx.request( {
            url:app.api.category,
            data: {
                
            },
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                // console.log(res);
                self.setData( {
                    data:res.data.data
                });
                wx.hideToast();
            }
        })
    },
    showOne:function(e){
        // 获取当前显示的一级菜单标识
		var index = parseInt(e.currentTarget.dataset.index);
		// 生成数组，全为hidden的，只对当前的进行显示
		var newSubMenuDisplay = initSubMenuDisplay();
        // 如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
		if(this.data.subMenuDisplay[index] == 'hidden') {
			newSubMenuDisplay[index] == 'show';
		} else {
			newSubMenuDisplay[index] == 'hidden';
		}
		// 设置为新的数组
		this.setData({
			subMenuDisplay: newSubMenuDisplay
		});
    }
})