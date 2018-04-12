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
    content_Lists : [],
    content_Channel_DateLists: ['0'],
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;   
    var s;
    for(var index=0;index<4;index++){
      s = this.convertDateFromString(s);
      s = this.getTimeAfterOneDays(s);
      this.data.content_Channel_DateLists.push(s);
    }
    // 
    console.log('content_Channel_DateLists' + this.data.content_Channel_DateLists);
    this.getChannelDataInfo(this.data.content_Channel_DateLists)
  },

  getChannelDataInfo : function (dataLists){
    var that = this;
    let content_ListsTemp = this.data.content_Lists
    if (dataLists.length > 0) {
      api.getIndexChannelList({
        query: {
          channelData: dataLists.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let data = res.data.data.content_list
            content_ListsTemp.push(res.data.data)
            that.setData({ content_Lists: content_ListsTemp })
          }
          that.getChannelDataInfo(dataLists)
        }
      })
    }else{
      console.log('should update UI')
    }
  },

  compare : function(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

  // 加载首页推荐数据
  // getIndexChannelList: function (channelDate){
  //   api.getIndexChannelList({
  //     query:{
  //       channelData : channelDate
  //     },
  //     success:(res)=>{
  //       if (res.data.res === 0){
  //         let data = res.data.data.content_list
  //         let tempContent_list = this.data.content_Lists
  //         tempContent_list.push(res.data.data)
  //         this.setData({ content_Lists: tempContent_list})
  //       }
  //     }
  //   })
  // },
 // 滑动到底部
  bindscrolltolowerAction:function(e){
    console.log('bindscrolltolowerAction');
  },
 // 刷新
  refreshAction : function(e){
    console.log("refresh action" + this.data.current);
  },
  // 滑动到顶部
  bindscrolltoupperAction: function (event){
    console.log('bindscrolltoupperAction' + event.detail)
  },
  // swiper 左右滑动
  get_index: function (e) {
    var crash_current = e.detail.current;
    if (crash_current === this.data.content_Lists.length - 1) {
      let contentItem = this.data.content_Lists[crash_current]
      let loadTimeDate = this.convertDateFromString(contentItem.date)
      let s = this.getTimeAfterOneDays(loadTimeDate);
      console.log('11232432loadTimeDate info :' + loadTimeDate + 'afterDay info:'+s);
      this.data.content_Channel_DateLists.push(s);
      this.getChannelDataInfo(this.data.content_Channel_DateLists)
    }
    this.setData({
      current: e.detail.current,
    });
  },
  // 将字符串日期转换为Date对象
  convertDateFromString: function (dateString) {
    if (dateString) {
      var arr1 = dateString.split(" ");
      var sdate = arr1[0].split('-');
      var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
      return date;
    }
  },
// 计算给定日期的后一天，参数为空时，为当前时间
  getTimeAfterOneDays: function(e){

    var date = new Date();
    if (e) {
      date.setTime(e.getTime() - 24 * 60 * 60 * 1000)
    } else{
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    }
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  // 点击内容选项
  contentItemTapAction: function (e) {
    let id = e.currentTarget.dataset.contentmodel.content_id
    let sourceID = e.currentTarget.dataset.contentmodel.id
    let category = e.currentTarget.dataset.contentmodel.category
    let typeInfo;
    switch (category) {
      case "2": {
        typeInfo = "serialcontent"
      } break;
      case "1": {
        typeInfo = "essay"
      } break;
      case "3": {
        typeInfo = "question"
      } break;
      case "4": {
        typeInfo = "music"
      } break;
      case "5": {
        typeInfo = "movie"
      } break;
      case "8": {
        typeInfo = "radio"
      } break;
      default: {
        typeInfo = ""
      }
    }
    if (category === "4" || category === "5") {
      wx.navigateTo({
        url: 'webPage/indexPageMusicWebView?type=' + typeInfo + '&sourceID=' + sourceID + '&id=' + id,
      })
    } else if (category === "8") {
      console.log("play radio");
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = e.currentTarget.dataset.contentmodel.audio_url;
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    } else {
      wx.navigateTo({
        url: 'webPage/indexPageWebView?type=' + typeInfo + '&sourceID=' + sourceID + '&id=' + id
      })
    }
  }

})