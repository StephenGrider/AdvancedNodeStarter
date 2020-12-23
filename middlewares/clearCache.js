const {clearHash} =require("../services/cache");

module.exports=async(req,res,next)=>{
  //wait untill the request to complete
  await next();
  // once completed then make a clear cache
  clearHash(req.user.id);
}