const Order = require("../models/orders");

exports.orders = async(req,res)=>{
try{
    let allOrders = await Order.find({}).sort({createdAt:-1}).populate("products.product").exec();
   if(allOrders.length>0){
    res.json({order:allOrders});
   }else{
      throw "zero orders" 
   }
}
catch(error){
  console.log(error)
  res.status(403).json({order:false}); 
}
}

exports.orderStatus = async(req,res)=>{
try {
const {orderId,orderStatus} = req.body;
let updated = await Order.findByIdAndUpdate(orderId,{orderStatus},{new:true}).exec();
// console.log("order updated",updated)
res.status(200).json(updated);
} catch (error) {
    console.log("error from order status",error)
}
}