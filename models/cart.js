const mongoose  = require("mongoose")
const {ObjectId} = mongoose.Schema;

const cartSchema = mongoose.Schema({
    products:[
        {
            product:{
                type:ObjectId,
                ref:"PRODUCT"
            },
            count:Number,
            color:String
        }
    ],
    cartTotal:Number,
    totalAfterDiscount:Number,
    orderdBy:{
        type:ObjectId,
        ref:"USER"
    }
},
{
    timestamps:true,
}
)

const Cart = mongoose.model("CART",cartSchema);
module.exports = Cart;