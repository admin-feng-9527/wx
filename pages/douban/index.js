// pages/douban/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [{key: 'in_theaters'}, {key: 'coming_soon'}, {key: 'top250'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'has_shown_splash',
      success: res => {
        this.retrieveData()
      },
      fail: err => {
        wx.redirectTo({
          url: '/pages/douban/splash',
        })
      }
    })
  },

  retrieveData() {
    let app = getApp()
  
    var promises = this.data.boards.map(function (board) {
      return app.request(`https://douban.uieee.com/v2/movie/${board.key}?start=0&count=10`)
        .then(function (d) {
          if (!d) return board
          board.title = d.title
          board.movies = d.subjects
          return board
        }).catch(err => console.log(err))
    })
  
    return app.promise.all(promises).then(boards => {
      console.log(boards)
      if (!boards || !boards.length) return
      this.setData({ boards: boards, loading: false})
    })
  },

  //小程序规定的下拉函数
  onPullDownRefresh() {
    this.retrieveData().then(() => wx.stopPullDownRefresh())
  }
})