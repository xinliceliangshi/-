//index.js
//获取应用实例
const app = getApp()
var openid = wx.getStorageSync("openid");
Page({
  shouquan(){
    wx.getUserProfile({
      desc: '业务需要',
      lang:'zh_CN',
      success:res=>{        
        this.saveUserInfo(res.userInfo)
      }
    })


  },
  data: {
    hasUserInfo: openid == "",
    userInfo:""
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
  }
})
