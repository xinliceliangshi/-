// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init(
  {  traceUser :true,
    env: 'roji-7gntql8nd56ab0e6',
  
  })
  const db= cloud.database({ env: 'roji-7gntql8nd56ab0e6',});

// 云函数入口函数
exports.main = async (event, context) => {
  var id =event.id;
  return await db.collection("news").doc(id).get();

  
}