// pages/posts/posts.js

var postsData = require('../../data/posts-item.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts_content: postsData.postList
    })
  },
  onPostTap:function(event){
    
    var postId = event.currentTarget.dataset.postid;
    console.log("111" + postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onSwiperTap:function(event){
    var postId = event.target.dataset.postid;
    console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})