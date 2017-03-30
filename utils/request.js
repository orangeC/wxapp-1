function send(url, data, method, success,fail) {
  wx.request({
    url: 'http://radar.3vcar.com'+ url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      success(res);
    },
    fail:function(res){
      fail(res);
    }
  })
};
function token(url,data,method,token,sucess,fail){
  wx.request({
    url: 'http://radar.3vcar.com'+ url,
    data:data,
    method: method, 
    header: {
        'content-type': 'application/json',
        'authorization':token
    },
    success: function(res){
        success(res);
    },
    fail: function() {
        fail(res);
    },
  })
}
module.exports = {
  send:send,
  token:token
};
