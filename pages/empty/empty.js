var app = getApp();
Page({
    data: {
        clientid: ""
    },
    onLoad: function (options) {
        console.log("onload")
        var that = this;

    },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow: function () {
        var that = this;
        if (!app.globalData.clientType) {
            //获取内存中user 的 ClientCode
            var ClientCode = app.globalData.user.ClientCode;
            console.log(ClientCode);
            that.setData({
                clientid: ClientCode
            });
            app.send("/wechat/load", { code: ClientCode }, "GET", function (res) {
                console.log(res.data);
                if (res.data) {
                    wx.showToast({
                        title: '加载中',
                        icon: 'loading',
                        duration: 1000,
                        complete: function () {
                            wx.redirectTo({
                                url: '/pages/offer/offer?code=' + res.data.code
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: '加载中',
                        icon: 'loading',
                        duration: 1000,
                        complete: function () {
                            wx.navigateTo({
                                url: '/pages/noedit/noedit'
                            })
                        }
                    })

                }
            })
        } else {
            if (app.globalData.clientType == "login") {
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 1000,
                    complete: function () {
                        wx.redirectTo({
                            url: '/pages/offer/offer?code=' + app.globalData.thatCode
                        })
                    }
                })
            } else if (app.globalData.clientType == "visit") {
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 1000,
                    complete: function () {
                        wx.navigateTo({
                            url: '/pages/noedit/noedit'
                        })
                    }
                })
            }
        }
        console.log(app.globalData.clientType);

        //获取内存中user 的 ClientCode
        var ClientCode = app.globalData.user.ClientCode;
        console.log(ClientCode);
        that.setData({
            clientid: ClientCode
        });
        app.send("/wechat/load", { code: ClientCode }, "GET", function (res) {
            console.log(res.data);
            if (res.data) {
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 1000,
                    complete: function () {
                        wx.redirectTo({
                            url: '/pages/offer/offer?code=' + res.data.code
                        })
                    }
                })
            } else {
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 1000,
                    complete: function () {
                        wx.navigateTo({
                            url: '/pages/noedit/noedit'
                        })
                    }
                })

            }
        })
        // 生命周期函数--监听页面显示
    },
    onHide: function () {
        console.log("hide")
    }
})