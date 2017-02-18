var app = getApp();
Page({
    data: {
        clientid: ""
    },
    onLoad: function (options) {
        console.log("onload")
        var that = this;

        //获取内存中user 的 ClientCode
        var ClientCode = app.globalData.user.ClientCode;
        console.log(ClientCode);
        that.setData({
            clientid: ClientCode
        });

    },
    onReady: function () {
        console.log("onready")
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow: function () {
        var that = this;
        //获得某个商家
        app.send("http://radar.3vcar.com/shop/load/", { code: that.data.clientid }, "GET", function (res) {
            if (res.data) {
                wx.showToast({
                    title: '页面跳转中',
                    icon: 'loading',
                    duration: 1000,
                })
                setTimeout(function () {
                    wx.navigateTo({
                        url: '/pages/offer/offer'
                    })
                }, 1000)

            } else {
                wx.showToast({
                    title: '页面跳转中',
                    icon: 'loading',
                    duration: 1000,
                })
                setTimeout(function () {
                    wx.navigateTo({
                        url: '/pages/noedit/noedit'
                    })
                }, 1000)
            }
        })
        console.log("onshow")
        // 生命周期函数--监听页面显示
    },
})