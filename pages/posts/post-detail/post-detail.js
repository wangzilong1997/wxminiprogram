// pages/posts/post-detail/post-detail.js

var postsData = require('../../../data/posts-item.js')
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
    var postid = options.id;
    this.data.currentPostId = postid;
    var postData = postsData.postList[postid];
    this.setData({postData})

    //是否收藏部分
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected){
      var postCollected = postsCollected[postid];
      this.setData({
          collected: postCollected
      })
    }else{
      var postsCollected = {};
      console.log(postid)
      postsCollected[postid] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }



  },
  onCollectionTap:function(event){
    var postsCollected = wx.getStorageSync("posts_collected");
    console.log("postsCollected", postsCollected)
    var postCollected = postsCollected[this.data.currentPostId];
    console.log("postCollected", postCollected)
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync("posts_collected", postsCollected)
    this.setData({
      collected: postCollected
    })
  },
  onShareTap:function(event){
   
  }
})