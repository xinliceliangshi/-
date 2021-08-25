
import common from "../../js/common";
const app = getApp()
var pathArr=[];
var id="";
var fomData={};
Page({
  data: {
    avatarUrl: '',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    isRegistered: false,
    userinformation: '',
  },











  onSubmit(res){

wx.showLoading({
  title: '发布中。。。',
})
var userInfo=app.globalData.userInfo
 
 
console.log(id);

     fomData=res.detail.value
   if(this.data.tempPath.length){

    
    this.data.tempPath.forEach((item,idx)=>{
      var d=new Date();
      var year= d.getFullYear()+"";
      var month=d.getMonth()+1;
      month=month<10 ?"0"+month:month+""
      var day=d.getDate();
      day=day<10?"0"+day:day+"";
var flie=common.getMyid()
      var filename="dddd/"+year+month+day+"/"+flie+common.getMyFile(item);
     
      this.uploadFile(filename,item)
    })
   
  }else{
    this.pushCloud(fomData)
  }


//this.pushCloud(fomData)
 
  
  },
  pushCloud(fomData){
    wx.cloud.callFunction({
      name:"add",
      data:
        fomData,
     
    }).then(res=>{
      
      console.log(res)
      wx.showToast({
        title: '发布成功',
      })
  
setTimeout(()=>{
      wx.reLaunch({
        url: '/pages/luntan/luntan',
      })
},1500)



      })
    
  },


  addImag(){

    wx.chooseImage({
      count:9,
success:res=>{
 
console.log(res)
this.setData({
tempPath:res.tempFilePaths
})
}


    })
  },


  uploadFile(filename,path){
   wx.cloud.uploadFile({
     cloudPath:filename,
     filePath:path

   }).then(res=>{
     pathArr.push(res.fileID)
    if(pathArr.length==this.data.tempPath.length){
      console.log("图像上传完毕")
      fomData.picUrl=pathArr
      this.pushCloud(fomData)
    }
   })



  },
  closes(res){

var idx=res.currentTarget.dataset.idx;
var tempPath=this.data.tempPath;
console.log(tempPath[idx])
tempPath.splice(idx,1);
this.setData({
  tempPath
})

  },
  


  onLoad: function (options) {

  }


  



})
