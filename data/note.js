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