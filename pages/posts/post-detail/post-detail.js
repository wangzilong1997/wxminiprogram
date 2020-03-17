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

    //两种提示框
    this.showToast(postsCollected, postCollected);
    //this.showModal(postsCollected, postCollected);

  },
  onShareTap:function(event){
   
  },
  showToast: function (postsCollected,postCollected){
    wx.setStorageSync("posts_collected", postsCollected)
    this.setData({
      collected: postCollected
    })

    //提示框
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  showModal: function (postsCollected, postCollected){
    var that =this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章吗？':'取消收藏吗？',
      cancelText:'取消',
      cancelColor:"#666",
      confirmText:'确定',
      confirmColor:'#405f80',
      success:function(res){
        if(res.confirm){
          wx.setStorageSync("posts_collected", postsCollected)
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  }
})