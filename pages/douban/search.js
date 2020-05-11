// pages/douban/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInputFocus: true,
    searchWords: "",
    wordsList: [],
    size:20,
    page: 1,
    movies: [],
    requestInternal: -1,
  },

  onTapSearchBtn() {
    console.log("words", this.data.searchWords)
    if(this.data.searchWords != "") {
      this.retrieve()
    }
    this.setData({
      searchInputFocus: false,
      searchWords: "",
      wordsList:[]
    });
  },

  retrieve() {
    let app = getApp()
    let start = (this.data.page - 1) * this.data.size

    wx.showLoading({
      title: '加载中',
    })

    return app.request(`https://douban.uieee.com/v2/movie/search?q=${this.data.searchWords}?start=${start}&count=${this.data.size}`)
    .then(res => {
      console.log(res)
      if(res.subjects.length) {
        let movies = this.data.movies.concat(res.subjects)//连接两个数组，拼接元素并返回新数组
        let total = Math.floor(res.total / this.data.size)
        this.setData({movies: movies, total: total, page: this.data.page, wordsList: []})
        wx.setNavigationBarTitle({ title: res.title })
        console.log(movies)
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      wx.hideLoading()
    })
  },

  showSearchInput() {
    this.setData({
      searchInputFocus: true
    });
  },

  //清空输入内容
  clearSearchInput() {
    this.setData({
      searchWords: ""
    });
  },

  //在搜索框输入内容时
  onSearchInputType(e) {
    let app = getApp()
    let words = e.detail.value
    // console.log(words)
    this.setData({
      searchWords: words
    });
    clearTimeout(this.data.requestInternal)
    //setTimeout只执行一次code,多次调用使用setInterval()或者让code自身再次调用setTimeout()
    this.data.requestInternal = setTimeout(() => {
      app.request(`https://douban.uieee.com/v2/movie/search?q=${words}&start=0&count=6`).then(d => {
        console.log(d)
        if(d.subjects.length) {
          this.setData({wordsList: d.length});
        }
      })
    },2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})