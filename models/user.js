const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const userSchema = new mongoose.Schema({
name:String,
email:{
  type:String,
  required:true,
  index:true
},
role:{
  type:String,
  default:'subscriber'
},
cart:{
  type:Array,
  default:[]
},
wishlist:[{
  type:ObjectId,
  ref:"product"
}],
address:{
  type:String,
}
},{
  timestamps:true
});

const User = mongoose.model("USER",userSchema);
module.exports = User;