const admin  = require('../firebase');
const User = require('../models/user');
exports.authCheck = async(req,res,next)=>{
    try {  
        // console.log('headers---->',req.headers); //token
        const token = req.headers.authtoken;
       const firebaseUser = await admin.auth().verifyIdToken(token);
       console.log('firebaseUser',firebaseUser);
       req.user = firebaseUser;
      next();
    } catch (error) {
        console.log(err);
        res.status(401).json({
            err:'invalid or expired token',
        })
    }
    
};

exports.adminCheck = async(req,res,next)=>{
 const {email} = req.headers;
 const adminUser = await User.findOne({email:email});
 console.log('adminUser---->',adminUser);
if(adminUser.role !== 'admin'){
res.status(403).json({err:'Admin Resource.Access Denied'});
}else{
    next();
}

}
