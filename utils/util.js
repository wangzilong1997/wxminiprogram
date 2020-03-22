function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array;
}

function http(target,callBack) {
  wx.request({
    url: target,
    method: 'GET',
    header: {
      "Content-Type": ""
    },
    success: function(res) {
      console.log(res)
      callBack(res.data)
    },
    fail: function(res) {
      console.log(res)
    },
    complete: function(res) {
      console.log(res)
    }
  })
}
module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http
}