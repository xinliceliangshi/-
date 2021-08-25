const app = getApp()
var openid = wx.getStorageSync("openid");
Page({
  /**
 * 页面的初始数据
 */
  data: {
    topNum: 0,
    newsList:[],
    hasUserInfo: openid == "",
    userInfo:""
  },
  shouquan(){
    wx.getUserProfile({
      desc: '业务需要',
      lang:'zh_CN',
      success:res=>{        
        this.saveUserInfo(res.userInfo)
      }
    })


  },
  
  saveUserInfo(userInfo){
    app.globalData.userInfo=userInfo
      //使用页面栈的方式，获取了授权信息接着更改用户页面的userInfo属性
   
    this.setData({
      userInfo
    })
     //使用云函数saveuser将用户信息存储到云数据库中
    wx.cloud.callFunction({
      name:"saveuser",
      data:{
        userInfo
      }
    }).then(res=>{      
      wx.showToast({
        title: '授权成功'
      })      
    
    })
  },
  getNewsData(){
    wx.cloud.callFunction({
      name:"shangchuan",
    
    })
 
    .then(res=>{
    
     this.setData({
newsList:res.result.data,

     })
    })


  },
  //JS代码
 
adddetial: function () {
 


  wx.getUserProfile({
    desc: '业务需要',
    lang:'zh_CN',
    success:res=>{        
      this.saveUserInfo(res.userInfo)
    }
  })
        wx.navigateTo({
     
          url: '/pages/user/user',
     
          success: function (res) { },
     
          fail: function (res) { },
     
          complete: function (res) { },
     
        })
  
},
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function onLoad(options) { 
    
 
    this.getNewsData()
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function onReady() { },
  /**
 * 生命周期函数--监听页面显示
 */
 
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function onHide() { },
  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function onUnload() { },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function onPullDownRefresh() { },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function onReachBottom() { },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function onShareAppMessage() { },
 })