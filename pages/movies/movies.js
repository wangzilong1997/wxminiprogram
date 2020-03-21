
var app = getApp();
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(event){
    var inTheatersUrl = app.globalData.dobanBase +  "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.dobanBase + "/v2/movie/commig_soon" + "?start=0&count=3";
    var top250Url = app.globalData.dobanBase + "/v2/movie/top250" + "?start=0&count=3";
    //this.getMovieListData(top250Url)
    this.getMovieListData(inTheatersUrl)
    //this.getMovieListData(comingSoonUrl)
   
  },
  getMovieListData:function(target){
    var that = this;
    wx.request({
      url: target,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        console.log(res)
        that.processDoubanData(res.data)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },
  processDoubanData:function(movieDouban){
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
      this.setData({
        movies: movies
      })
  }

})