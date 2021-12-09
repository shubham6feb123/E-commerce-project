const User = require("../models/user");

exports.verifyUser = async(req,res)=>{
try {
    const {user} = req.body;
  const verified =   await User.findOne({_id:user});
//   console.log("very",verified)
  if(verified){
      res.status(200).json({status:"verified"});
    //   console.log("payment se ",user)
  }else{
      throw "failed to verify user";
  }

} catch (error) {
     console.log("error",error)
     res.status(403).json(error)
}
}