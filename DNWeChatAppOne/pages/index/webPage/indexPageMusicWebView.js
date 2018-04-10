

var api = require('../../../api/api.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handlePullSerialDetailAction(options)

    wx.setNavigationBarTitle({
      title: options.type,
    })
  },



  // 加载文章详细数据
  handlePullSerialDetailAction: function (e) {
    api.getIndexChannelMusicItemDetail({
      query: {
        "type": e.type,
        "pageID": e.id,
        "sourceID": e.sourceID,
        "id": e.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let serial = res.data.data
          // serial.makettime = util.formatMakettime(serial.maketime)
          this.setData({ serial });
        }
      }
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