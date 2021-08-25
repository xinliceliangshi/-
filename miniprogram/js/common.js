const common={
getMyid(){
  
  return Number(Math.random().toString().substr(3,9) + Date.now()).toString(36);
},
getMyFile(file)
{
var index=file.lastIndexOf(".")
return file.substr(index);
}
}
module.exports=common


