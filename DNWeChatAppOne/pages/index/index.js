//index.js
//获取应用实例
const app = getApp()
import api from "../../api/api.js"
import util from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vols : [],
    current: 0,
    content_list : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    api.getVolIdList({
      success:(res) => {
        if (res.data.res === 0){
          let idList = res.data.data
          this.getVols(idList)
        }
      }
    });
    this.getIndexChannelList()
  },

  // 加载首页推荐数据
  getIndexChannelList : function(options){
    api.getIndexChannelList({
      success:(res)=>{
        if (res.data.res === 0){
          let data = res.data.data.content_list
          this.getContent_List(data)
          this.setData({ content_list:data})
          debugger
          console.log('contentlist info' + this.data.content_list)
        }
      }
    })
  },

  getContent_List: function(content_list) {
    let contentList = this.data.content_list
    for(var i = 0;i<contentList.length;i++){
      let contentItem = contentList[i]
      contentItem.post_date = util.formatMakettime(vol.post_date)
    }
  },

  getVols: function (idList) {
    let vols = this.data.vols

    if (idList.length > 0) {
      api.getVolById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let vol = res.data.data

            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
            vols.push(vol)
          }
          this.getVols(idList)
        }
      })
    } else {
      this.setData({ vols })
    }
  },
  handleChange: function (e) {
    let current = e.detail.current
    let volsLength = this.data.vols.length

    if (current === volsLength) {
      debugger
      this.setData({
        current: volsLength
      })
      wx.navigateTo({
        url: '../history/history?page=index',
        success: () => {
          this.setData({
            current: volsLength - 1
          })
        }
      })
    }
  }
})