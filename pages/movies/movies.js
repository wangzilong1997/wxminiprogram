// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(event){
    wx.request({
      url: 'http://t.talelin.com/v2/movie/top250',
      data:{},
      method:'GET',
      header:{
        "Content-Type":"json"
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(res){
        console.log(res)
      }
    })
  }
})