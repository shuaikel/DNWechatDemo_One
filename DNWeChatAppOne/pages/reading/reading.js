
import api from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carousel : [],
    articles : {},
    current : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handlePullCarouselDataAction()
    this.handlePullShortTypeAction()
  },
  // 请求轮播图片数据
  handlePullCarouselDataAction : function(options){
    api.getCarousel({
      success: (res) => {
        if (res.data.res == 0) {
          let carousel = res.data.data
          this.setData({ carousel })
        }
      }
    })
  },
 // 左右滑动响应
  handleChange : function(options){
    console.log("current index" + this.data.current)
  },

  //  加载短篇数据
  handlePullShortTypeAction: function(options){
    api.getLastArticles({
      success: (res) => {
        if (res.data.res == 0){
          let articles = res.data.data  
          this.setData({ articles })
        }
      }
    })
  },
  // 短篇文章点击
  tapEssay : function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'essay/essay?id='+id,
    })
  },
  // 连载文章点击
  tapSerial : function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'serial/serial?id=' + id
    })
  },
  // 问答文章点击
  tapQuestion : function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'question/question?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '阅读',
    })
  },

  handleChange : function(e){
    let current = e.detail.current
    let length = this.data.articles.essay.length
    if (current === length){
      this.setData({current:length})
      wx.navigateTo({
        url: '../history/history?page=reading',
        success:()=>{
          this.setData({
            current : length - 1 
          })
        }
      })
    }
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