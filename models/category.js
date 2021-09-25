const mongoose = require('mongoose');
// const {objectId} = mongoose.Schema;
const categorySchema = new mongoose.Schema({
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
}
},

{timestamps:true});

const Category = mongoose.model('CATEGORY',categorySchema);
module.exports  = Category;
