const mongoose  = require("mongoose");
const {ObjectId} = mongoose.Schema;

const couponSchema = mongoose.Schema({
   name:{
       type:String,
       trim:true,
       unique:true,
       uppercase:true,
       required:"name is required",
       minlength:[6,"Too short"],
       maxlength:[12,"Too long"]
   },
   expiry:{
       type:Date,
       required:true,
   },
   discount:{
       type:Number,
       required:true
   }
},
{
    timestamps:true,
}
)

const Coupon = mongoose.model("COUPON",couponSchema);
module.exports = Coupon;