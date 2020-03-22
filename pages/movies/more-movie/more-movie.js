var app = getApp();
var util = require('../../../utils/util.js')
// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    navigateTitle:"",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    console.log(category);
    var dataUrl = "";
    switch (category){
      case "正在热映":
        dataUrl = app.globalData.dobanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.dobanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣top250":
        dataUrl = app.globalData.dobanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl,this.processDoubanData)
  },
  processDoubanData: function(movieDouban){
    var movies = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
      console.log(movies)
      
    }
    var totalMovies = {};
    this.data.totalCount += 20;
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty =false;
    }
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading()
  },
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  onScrollLower:function(){
    console.log("下拉刷新")
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading();
  }
})