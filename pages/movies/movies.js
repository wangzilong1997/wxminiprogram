var util = require('../../utils/util.js')
var app = getApp();
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters : {},
    comingSoon : {},
    top250 : {},
    searchResult: {},
    containerShow:true,
    searchPanelShow:false
  },
  onLoad:function(event){
    var inTheatersUrl = app.globalData.dobanBase +  "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.dobanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.dobanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(top250Url,"top250","豆瓣top250")
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映")
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映")
   
  },
  getMovieListData:function(target,settedKey, categoryTitle){
    var that = this;
    wx.request({
      url: target,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        console.log(res)
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },
  processDoubanData: function (movieDouban, settedKey, categoryTitle){
      var movies = [];
      for(var idx in movieDouban.subjects){
        var subject = movieDouban.subjects[idx];
        var title = subject.title;
        if(title.length >= 6){
          title = title.substring(0,6) + "..."
        }
        var temp = {
          stars: util.convertToStarsArray(subject.rating.stars),
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
        categoryTitle: categoryTitle,
        movies:movies
      }

      this.setData(readyData)
  },
  onScrollLower:function(){
      console.log("加载列表")
  },
  onMoreTap:function(event){
      var category = event.currentTarget.dataset.category;
      wx.navigateTo({
        url: 'more-movie/more-movie?category=' + category,
      })
  },
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },
  onBindChange:function(e){
    var searchUrl = app.globalData.dobanBase + "/v2/movie/search?q="+ e.detail.value
    console.log(searchUrl)
    this.getMovieListData(searchUrl,"searchResult","")
  },
  onMovieTap:function(e){
    var movieId = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  }

})