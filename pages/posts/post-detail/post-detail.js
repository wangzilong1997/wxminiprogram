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
    console.log(postid);
    var postData = postsData.postList[postid];
    console.log(postData);
    this.setData(postData);
    
    wx.setStorageSync('key', postData)

  },
  onCollectionTap:function(event){
    console.log(wx.getStorageSync('key'))
  },
  onShareTap:function(event){
    //wx.removeStorageSync('key');
    wx.clearStorageSync();
  }
})