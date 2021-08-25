// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db= cloud.database({ env: 'roji-7gntql8nd56ab0e6',});
// 云函数入口函数
exports.main = async (event, context) => {
  const openid=cloud.getWXContext().OPENID
  var{title,author,content,picUrl,}=event
  
 db.collection("shangchuan").add({
data:{
title,
author,
content,
openid,
zan:0,
ping:0,
posttime:Date.now(),
picUrl,


}




  });
  
}