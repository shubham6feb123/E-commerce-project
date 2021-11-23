const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000,
        text:true,
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true,
        index:true
    },
    description:{
        type:String,
        maxlength:2000,
        required:true,
        text:true,
    },
    price:{
     type:Number,
     require:true,
     trim:true,
    },
    category:{
        type:ObjectId,
        ref:"CATEGORY"
    },
    subcategories:[{
        type:ObjectId,
        ref:"SUBCATEGORY"
    }],
    quantity:{
        type:Number
    },
    sold:{
        type:Number,
        default:0,
    },
    images:{
        type:Array
    },
    shipping:{
        type:String,
        enum:["Yes","No"]
    },
   color:{
       type:Array
   }
   ,
    brand:{
        type:String
    },
    rating:[{
        star:Number,
        postedBy:{type:ObjectId,ref:"User"}
    }],
   
},
{timeStamps:true})

const product = mongoose.model("PRODUCT",productSchema)
module.exports = product;