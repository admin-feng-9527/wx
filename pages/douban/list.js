// pages/douban/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'in_theaters',//电影类型
    page:1,//分页页码
    size:20,//最多拉取数据条数
    total:1,//从服务器获取默认为1
    movies:[]//拉取到的数据，累加数组
  },
loadMorePage() {
  if (this.data.page > this.data.total) return
  this.data.page++
  this.retrieve()
},

  retrieve() {
    let app = getApp()
    let start = (this.data.page - 1) * this.data.size

    wx.showLoading({
      title: '加载中',
    })

    return app.request(`https://douban.uieee.com/v2/movie/${this.data.type}?start=${start}&count=${this.data.size}`)
    .then(res => {
      if(res.subjects.length) {
        // console.log(res)
        let movies = this.data.movies.concat(res.subjects)//连接两个数组，拼接元素并返回新数组
        let total = Math.floor(res.total / this.data.size)
        this.setData({movies: movies, total: total, page: this.data.page})
        wx.setNavigationBarTitle({ title: res.title })
        console.log(movies)
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      wx.hideLoading()
    })
  },

  onLoad(options) {
    // 有三种类型： in_theaters  coming_soon  us_box
    this.data.type = options.type || this.data.type
    this.retrieve()
  }
})