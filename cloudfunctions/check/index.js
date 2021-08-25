// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "roji-7gntql8nd56ab0e6"//默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境，传入对象可以分别指定各个服务的默认环境
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, _context) => {
  const { code } = event
  var inviteCode = "1"
  console.log(code)
  return await db.collection('check').where({
      inviteCode: event.code
    }).count({ })

}