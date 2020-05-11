// pages/douban/splash.js
Page({
  data: {
    subjects: [],
  },
  onLoad(options) {
    console.log("...")
    let app = getApp()
    app.request("https://douban.uieee.com/v2/movie/in_theaters").then(
      data => {
        console.log("..11.",data)
        this.setData({ subjects: data.subjects })
      }
    ),
    wx.setStorage({
      key: 'has_shown_splash',
      data: true,
    })
  }
  
})