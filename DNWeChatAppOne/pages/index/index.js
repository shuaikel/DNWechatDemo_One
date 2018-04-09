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
    content_Lists : [],
    content_Channel_DateLists: ['0','2018-04-08'],
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
    this.getChannelDataInfo(this.data.content_Channel_DateLists)
    let timeFormatter = new Date()
    let time = this.getChannelFormatDate(timeFormatter)
    // console.log("current time info:" + time)
  },

  getChannelDataInfo : function (dataLists){
    let content_Lists = this.data.content_Lists

    if (dataLists.length > 0) {
      api.getIndexChannelList({
        query: {
          channelData: dataLists.shift()
        },
        success: (res) => {
          // console.log('request time info:'+dataLists)
          if (res.data.res === 0) {
            let data = res.data.data.content_list

            this.getContent_List(data)
            content_Lists.push(res.data.data)
          }
          this.getChannelDataInfo(dataLists)
        }
      })
    } else { 
      let tt = content_Lists.sort(this.compare('id'))
      this.setData({ content_Lists:tt})
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
  getIndexChannelList: function (channelDate){
    api.getIndexChannelList({
      query:{
        channelData : channelDate
      },
      success:(res)=>{
        if (res.data.res === 0){
          let data = res.data.data.content_list
          this.getContent_List(data)
          let tempContent_list = this.data.content_Lists
          tempContent_list.push(res.data.data)
          this.setData({ content_Lists: tempContent_list})
        }
      }
    })
  },

  getContent_List: function(content_list) {
    
    let contentList = content_list
    for(var i = 0;i<contentList.length;i++){
      let contentItem = contentList[i]
      contentItem.post_date = util.formatMakettime(contentItem.post_date)
      switch (contentItem.category){
        case "2":{
          contentItem.category = "连载"
        }break;
        case "1" :{
          contentItem.category = "阅读"
        }break;
        case "3" : {
          contentItem.category = "问答"
        }break;
        case "4": {
          contentItem.category = "音乐"
        } break;
        case "5": {
          contentItem.category = "影视"
        } break;
      }
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
    let volsLength = this.data.content_Lists.length
    
    console.log("current page index" + current + 'volsLength' + volsLength)
    this.setData({ current })
    if (current === volsLength-1) {
      let contentItem = this.data.content_Lists[volsLength-1]
      this.setData({
        current: current
      })
      let loadTime = contentItem.date
      let loadTimeDate = new Date(loadTime)
      let channelLoadTime = this.getChannelFormatDate(loadTimeDate)
      this.data.content_Channel_DateLists.push(channelLoadTime)
      this.getChannelDataInfo(this.data.content_Channel_DateLists)
    }
  },

  refreshAction : function(e){
    console.log("refresh action" + this.data.current);
    // let currentIndex = this.data.current
    // let contentItem = this.data.content_Lists[currentIndex]
    // let loadTime = contentItem.date
    // let loadTimeDate = new Date(loadTime).getTime() + 24 * 60 * 60 * 1000
    // let channelLoadTime = this.getChannelFormatDate(new Date(loadTimeDate))
    // this.data.content_Channel_DateLists.push(channelLoadTime)
    // if (contentItem){
    //   this.data.content_Lists.pop(contentItem)
    //   this.getChannelDataInfo(this.data.content_Channel_DateLists)
    // }
  },

  //获取当前时间，格式YYYY-MM-DD
  getChannelFormatDate : function (e) {
    var date = new Date();
    if(e){
      date.setTime(e.getTime() - 24 * 60 * 60 * 1000)
      
    }else{
      return "0"
    }
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(month >= 1 && month <= 9) {
      month = "0" + month;
    }
        if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }

})