// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db= cloud.database({ env: 'roji-7gntql8nd56ab0e6',});
// 云函数入口函数
exports.main = async (event, context) => {
  const openid=cloud.getWXContext().OPENID
  return await db.collection("shangchuan").get();

}