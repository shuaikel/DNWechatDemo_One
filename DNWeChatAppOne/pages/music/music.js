import api from "../../api/api.js"
import util from "../../utils/util.js"

Page({
  data: {
    c_index: 0,//当前  
    s3_width: 0,
    t_width: 250,//上方每个tab的大小  
    scroll_left: 0,//上方滚动的位置  
    t_margin_left: 0,//上方的margin-left  
    currentDate : '',
    content_Lists: [{ "name": "1", "color": "orange", }
      , { "name": "2", "color": "blue", }],
  },

  // 加载首页推荐数据
  getIndexChannelList: function (channelDate) {
    api.getIndexChannelList({
      query: {
        channelData: channelDate
      },
      success: (res) => {
        if (res.data.res === 0) {
          let tempData = this.data.tab_tite_data;
          let tempContentLists = this.data.content_Lists;
          tempContentLists.push(res.data.data);
          this.setData({
            content_Lists: tempContentLists,
          })
        }
      }
    })
  },
  onLoad :function(){
    this.getIndexChannelList('0')
  },
  onShow: function () {
    this.getwidth();
  },
  //滑  
  get_index: function (e) {

    var crash_current = e.detail.current;
    var s = 0;
    if (crash_current != 0 && crash_current != 1) {
      s = parseInt(crash_current - 1) * this.data.s3_width;
    }
    if (crash_current === this.data.tab_tite_data.length - 1){
      console.log('muisc current index '+ crash_current)
      let dataStr = this.convertDateFromString(this.data.currentDate);
      let timeStr = this.getTimeAfterOneDays(dataStr);
      this.setData({ currentDate: timeStr})
      this.getIndexChannelList(timeStr)
    }
    this.setData({
      c_index: e.detail.current,
      scroll_left: s
    });
  },
  // 将字符串日期转换为Date对象
  convertDateFromString: function (dateString) {
    if (dateString) {
      var arr1 = dateString.split("-");
      var date = new Date(arr1[0], arr1[1] - 1, arr1[2]);
      return date;
    }else{
      return new Date()
    }
  },
  // 计算给定日期的后一天，参数为空时，为当前时间
  getTimeAfterOneDays: function (e) {

    var date = new Date();
    if (e) {
      date.setTime(e.getTime() - 24 * 60 * 60 * 1000)
    } else {
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
  // 点  
  changeview: function (e) {
    var crash_current = e.currentTarget.dataset.current;
    var s = 0;
    if (crash_current != 0 && crash_current != 1) {
      s = parseInt(crash_current - 1) * this.data.s3_width;
    }
    this.setData({
      c_index: e.currentTarget.dataset.current,
      scroll_left: s
    });
  },
  getwidth: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData(that.data.s3_width = res.windowWidth / 3);
      },
    })
  }
})  