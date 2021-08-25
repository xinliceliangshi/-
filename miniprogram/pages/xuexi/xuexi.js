


const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({
  
  data: {
    jssj:'2022-5-19 23:59:59',  //结束时间
    timer:'', //倒计时定时器名称
    djs:{day:'00',hour:'00',min:'00',sec:'00'}, //倒计时
    myAppointment: [],
    showCancelModal: false,   //是否显示取消模糊框
    cancelId: '',   //点击的取消预约的数组下标
    today: '',  //小于今天的预约记录不可取消，作为历史预约保存
  },
  onLoad: function (options) {
    let d = new Date();           //获取今天的日期
    let month = d.getMonth() + 1;
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let day = d.getDate();
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    const _this = this;
    db.collection('yuyue').where({
      _openid: app.globalData.openid
    }).limit(5).orderBy('submissionTime', 'desc').get({
      success: res => {
        console.log(res)
        _this.setData({
          myAppointment: res.data,
          today: d.getFullYear() + "-" + month + "-" + day
        })
      }
    })
    let that = this;
    that.timeDown();
  },
  loadMore: function () {
    const _this = this;
    db.collection("yuyue").where({
      _openid: app.globalData.openid
    }).skip(_this.data.myAppointment.length)
      .limit(5).orderBy('submissionTime', 'desc')
      .get({
        success: res => {
          if (res.data.length == 0) {
            wx.showToast({
              title: '到底了！',
              icon: 'none',
              duration: 1500
            })
          } else {
            _this.setData({
              myAppointment: [..._this.data.myAppointment, ...res.data], //合并数据
            })
          }

        }
      })
  },
  timeDown(){
    let that = this;
    that.setData({
      timer:setInterval(function(){
        var leftTime = parseInt((new Date(that.data.jssj.replace(/-/g,'/')).getTime()-new Date().getTime()));
        if(leftTime<=0){
          that.setData({
            djs:{day:'00',hour:'00',min:'00',sec:'00'}
          });
          // wx.showToast({
          //   title: '活动已结束',
          // });
          clearInterval(that.data.timer);
          return;
        }
        var d = parseInt(leftTime/1000/3600/24);  //天数
        var h = parseInt(leftTime/1000/3600%24);  //小时
        var m = parseInt(leftTime/1000/60%60);    //分钟
        var s = parseInt(leftTime/1000%60);       //秒
        d < 10 ? d = '0' + d : d;
        h < 10 ? h = '0' + h : h;
        m < 10 ? m = '0' + m : m;
        s < 10 ? s = '0' + s : s;
        that.setData({
          djs:{day:d,hour:h,min:m,sec:s}
        })
      },1000)
    })
  },
  showCancelModal: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      showCancelModal: true,
      cancelId: e.currentTarget.dataset.index
    })
  },

  hideCancelModal: function () {
    this.setData({
      showCancelModal: false,
    })
  },

  /**
   * 取消预约
   */
  cancelAppointment: function () {
    let id = this.data.cancelId;
    let _this = this;
    db.collection('yuyue').doc(_this.data.myAppointment[id]._id).remove({
      success: res => {
        let newArray = _this.data.myAppointment;
        newArray.splice(id, 1);   //把当前前端被取消预约的数组项删除
        wx.showToast({
          title: '取消预约成功！',
          icon: 'success',
          duration: 1500
        })
        _this.setData({
          showCancelModal: false,
          myAppointment: newArray,
        })
      },
      fail: res => {
        wx.showToast({
          title: '取消预约失败，请稍后再试！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  }
})


