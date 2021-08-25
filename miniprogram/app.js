
//app.js
App({
  onLaunch: function () {


   



    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        
        env: 'roji-7gntql8nd56ab0e6',
        traceUser: true,
      })
    }
    this.globalData = {
      
    },
 wx.getSetting({
  success:res=>{
    if(res.authSetting['secop.userInfo']){
wx.getUserInfo({
  success:res=>{
    this.globalData.userInfo=res.userInfo
  }
})
    }
  }
 })

    
    /**
     * 打开小程序的时候首先获得用户openid
     */
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid;
        this.isRegistered();
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
 
  /**
   * 查询用户是否已经注册
   * 如已注册则获取信息
   */
  isRegistered() {
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        if (res.data.length != 0) {
          console.log('[数据库] [查询业主表] 用户已认证: ', res);
          this.globalData.isRegistered = true;
          this.globalData.userInfo = res.data[0]
        } else {
          console.log('[数据库] [查询业主表] 用户未认证: ', err)
        }
      },
      fail: err => {
        console.error('[数据库] [查询业主表] 失败：', err)
      }
    })
  },
 


})