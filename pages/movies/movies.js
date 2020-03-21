
var app = getApp();
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters : {},
    comingSoon : {},
    top250 : {}
  },
  onLoad:function(event){
    var inTheatersUrl = app.globalData.dobanBase +  "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.dobanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.dobanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(top250Url,"top250")
    this.getMovieListData(inTheatersUrl,"inTheaters")
    this.getMovieListData(comingSoonUrl,"comingSoon")
   
  },
  getMovieListData:function(target,settedKey){
    var that = this;
    wx.request({
      url: target,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        console.log(res)
        that.processDoubanData(res.data, settedKey)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },
  processDoubanData: function (movieDouban, settedKey){
      var movies = [];
      for(var idx in movieDouban.subjects){
        var subject = movieDouban.subjects[idx];
        var title = subject.title;
        if(title.length >= 6){
          title = title.substring(0,6) + "..."
        }
        var temp = {
          title:title,
          average:subject.rating.average,
          coverageUrl:subject.images.large,
          movieId:subject.id
        }
        movies.push(temp)
        console.log(movies)
      }
      var readyData = {};
      readyData[settedKey] = {
        movies:movies
      }

      this.setData(readyData)
  }

})