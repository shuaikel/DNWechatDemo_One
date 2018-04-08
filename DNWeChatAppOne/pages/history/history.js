
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateList: [],
    types : [
      {
        type: "essay",
        name: "短篇"
      },
      {
        type: "serialcontent",
        name: "连载"
      },
      {
        type: "question",
        name: "问题"
      },
    ],
    page: 'index',
    type: "essay"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = options.page
    let dataList = util.getDateList(page)
    this.setData({
      page: page,
      dateList: dataList
    })
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