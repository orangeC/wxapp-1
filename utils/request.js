function send(url, data, method, success) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      success(res);
    }
  })
};
module.exports.send = send