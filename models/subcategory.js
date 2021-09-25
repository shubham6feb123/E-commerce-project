const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:[2,"Too short"],
        maxlength:[40,"Too long"],
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },
    parent:{
        type:ObjectId,
        ref:"Category",
        required:true
    }
},{timestamps:true})

const subCategory = mongoose.model("SUBCATEGORY",subCategorySchema);
module.exports = subCategory;