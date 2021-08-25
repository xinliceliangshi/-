// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db= cloud.database({ env: 'roji-7gntql8nd56ab0e6',});

// 云函数入口函数
exports.main = async (event, context) => {


  const openid = cloud.getWXContext().OPENID
  const {userInfo}=event;
  userInfo.openid=openid;
  //获取数据库中有没有当前用户的信息
  var res= await db.collection("userAll").where({
    openid:openid
  }).count()


  if(res.total>0){
    return await db.collection('userAll').where({
      openid
    }).update({
      data: userInfo
    })
  }else{
    return await db.collection('userAll').add({
      data: userInfo
    })
  }
}