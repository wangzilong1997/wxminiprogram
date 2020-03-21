
var app = getApp();
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(event){
    var inTheatersUrl = app.globalData.dobanBase +  "/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.dobanBase +  "/v2/movie/commig_soon";
    var top250Url = app.globalData.dobanBase +  "/v2/movie/top250";
    this.getMovieListData(top250Url)
    this.getMovieListData(inTheatersUrl)
    this.getMovieListData(comingSoonUrl)
   
  },
  getMovieListData:function(target){
    wx.request({
      url: target,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  }

})