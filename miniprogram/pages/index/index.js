


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    carouselImgUrls:[
      "cloud://roji-7gntql8nd56ab0e6.726f-roji-7gntql8nd56ab0e6-1305661403/images/acm.jpg",
     
      "/images/222.jpg"

    ],

  },
  change1: function () {
    wx.navigateTo({
        
            url: "/pages/lujing/lujing",
       
            success: function (res) { },
       
            fail: function (res) { },
       
            complete: function (res) { }, 
          })



  },
  change2: function () {
    wx.navigateTo({
        
            url: "/pages/ziyuan/ziyuan",
       
            success: function (res) { },
       
            fail: function (res) { },
       
            complete: function (res) { }, 
          })


      },
      change3: function () {
          wx.navigateTo({
        
                  url: "/register/register",
             
                  success: function (res) { },
             
                  fail: function (res) { },
             
                  complete: function (res) { }, 
                })
    
          },
  getData(num=3,page=0){
    wx.cloud.callFunction({
      name:"news",
      data:{
         num:num,
         page:page
      }
    })
 
    .then(res=>{
      var oldData=this.data.dataList
      var newData=oldData.concat(res.result.data);
   this.setData({
     dataList:newData
   })
    })



    

  },



  changePlay(){
    let flag = !this.data.play;
    this.setData({
      play:flag
    });
    //start title
    let titleOpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    titleOpenAn.opacity(0).step();
    this.setData({
      titleOpenAn:titleOpenAn.export()
    });
    let titleCloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    titleCloseAn.opacity(1).step();
    this.setData({
      titleCloseAn:titleCloseAn.export()
    });
    //end title
    // start 第一条line
    let line1OpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    line1OpenAn.translateY(12).rotate(45).scale(1.4, 1).step();
    this.setData({
      line1OpenAn:line1OpenAn.export()
    });
    let line1CloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '12rpx 50%'
    });
    line1CloseAn.translateY(0).rotate(0).scale(1, 1).step();
    this.setData({
      line1CloseAn:line1CloseAn.export()
    });
    //end 第一条line

    // start 第二条line
    let line2OpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    line2OpenAn.translateY(-6.5).translateX(-1).rotate(-45).scale(1.4, 1).step();
    this.setData({
      line2OpenAn:line2OpenAn.export()
    });

    let line2CloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    line2CloseAn.translateY(0).rotate(0).scale(1, 1).step();
    this.setData({
      line2CloseAn:line2CloseAn.export()
    });
    //end 第二条line

    //start 第一个按钮
    let btn1Open = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn1Open.translateX(-60).opacity(1).step();
    this.setData({
      btn1Open:btn1Open.export()
    });

    let btn1Close = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn1Close.translateX(0).opacity(0).step();
    this.setData({
      btn1Close:btn1Close.export()
    });
    //end 第一个按钮
    //start 第二个按钮
    let btn2Open = wx.createAnimation({
      duration: 500,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn2Open.translateX(-120).opacity(1).step();
    this.setData({
      btn2Open:btn2Open.export()
    });

    let btn2Close = wx.createAnimation({
      duration: 500,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn2Close.translateX(0).opacity(0).step();
    this.setData({
      btn2Close:btn2Close.export()
    });
    //end 第二个按钮
    //start 第三个按钮
    let btn3Open = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn3Open.translateX(-180).opacity(1).step();
    this.setData({
      btn3Open:btn3Open.export()
    });

    let btn3Close = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn3Close.translateX(0).opacity(0).step();
    this.setData({
      btn3Close:btn3Close.export()
    });
    //end 第三个按钮
    //start 第四个按钮
    let btn4Open = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn4Open.translateX(-240).opacity(1).step();
    this.setData({
      btn4Open:btn4Open.export()
    });

    let btn4Close = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn4Close.translateX(0).opacity(0).step();
    this.setData({
      btn4Close:btn4Close.export()
    });
    //end 第四个按钮
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
this.getData()

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
    var page=this.data.dataList.length
    this.getData(3,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
