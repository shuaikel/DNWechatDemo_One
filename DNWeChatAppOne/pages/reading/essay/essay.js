
import{
  AUDIO_PLAY_TEXT,
  AUDIO_PLAY_IMG ,
  AUDIO_PAUSE_TEXT,
  AUDIO_PAUSE_IMG
}from "../../../utils/constants.js"

var api = require('../../../api/api.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    essay : {},
    audioBtn : {
      text: AUDIO_PLAY_TEXT,
      imgPath: AUDIO_PLAY_IMG
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handlePullEssayDetailAction(options)
  },

  // 加载文章详细数据
  handlePullEssayDetailAction:function(e){
    api.getEssayById({
      query:{
        id : e.id
      },
      success: (res) => {
        if( res.data.res === 0){
          let essay = res.data.data
          essay.hp_content = util.filterContent(essay.hp_content)
          essay.hp_makettime = util.formatMakettime(essay.hp_makettime)
          this.setData({essay});
        }
      }
    })
  },

  // 收听按钮点击事件
  togglePlay : function (e){
    var audio = this.data.essay.audio
    var audioBtn = this.data.audioBtn

    if (audioBtn.text === AUDIO_PLAY_TEXT) {
      audioBtn = {
        text: AUDIO_PAUSE_TEXT,
        imgPath: AUDIO_PAUSE_IMG
      }
       this.playAudio(audio)
    } else {
      audioBtn = {
        text: AUDIO_PLAY_TEXT,
        imgPath: AUDIO_PLAY_IMG
      }
       this.pauseAudio()
    }
    this.setData({ audioBtn })
  },

  // 播放
  playAudio: function (audio){
    var title = this.data.essay.hp_title
    wx.playBackgroundAudio({
      dataUrl: audio,
      title: title
    })
  },
  // 暂停播放
  pauseAudio: function(aduio){
    wx.pauseBackgroundAudio()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '短篇',
    })
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