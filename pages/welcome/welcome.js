Page({
  onTap:function(){
    //console.log("onTap")
    // wx.navigateTo({
    //   url: '../posts/posts'
    // })
    /*wx.redirectTo({
      url: '../posts/posts'
    })*/
    wx.switchTab({
      url: '../posts/posts',
    })
  }
})