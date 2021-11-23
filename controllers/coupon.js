const Coupon  = require("../models/coupon");
const User = require("../models/user");
const Cart  = require("../models/cart")

exports.create = async (req,res) => {
  // console.log("coupon---->",req.body)
  try {
      const {name,expiry,discount} = req.body;
      let coupcreated = await new Coupon({
          name,expiry,discount
      }).save();

      res.json(coupcreated);
  } catch (error) {
      console.log("failed to create coupon",error)
      res.status(403).json({error})
  }
};

exports.remove = async (req,res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.couponId)
      res.json(deleted)
  } catch (error) {
    console.log("failed to remove coupon",error)
    res.status(403).json({error})
  }
};

exports.list = async (req,res) => {
  try {
      res.json(await Coupon.find({}).sort({createdAt:-1}));
  } catch (error) {
    console.log("failed to list coupon",error)
    res.status(403).json({error})
  }
};

exports.verifyCoupon = async(req,res)=>{
try{
  const coupon = await Coupon.find({name:req.body.verify}); 
  const user = await User.find({email:req.user.email});
 if(coupon.length>0){
   let {products,cartTotal} = await Cart.findOne({orderdBy:user._id}).populate("products.product","_id title price").exec();
   console.log("products",products,"cartTotal",cartTotal)
   console.log("coupon",coupon);
   res.json(coupon)
 }else{
   throw "code invalid!";
 }
}catch(error){
// console.log("failed to verify",error);
res.status(403).json({message:error})
}
}