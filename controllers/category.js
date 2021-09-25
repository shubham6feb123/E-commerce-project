const Category = require("../models/category");
const slugify = require('slugify');


const create = async(req,res)=>{
try {
    const {name} = req.body;
const category = await new Category({
    name:name,
    slug:slugify(name)
}).save();

res.json(category);

} catch (error) {
    console.log(error);
    res.status(400).send('create category failed');
}
};

const list = async(req,res)=>{
try {
    const categoryList = await Category.find({}).sort({createdAt:-1});
res.json(categoryList);
} catch (error) {
    res.json(error);
}
};

const read = async(req,res)=>{
try {
    const category = await Category.findOne({slug:req.params.slug})
    res.json(category)
} catch (error) {
    res.json(error)
}
};

const update = async(req,res)=>{
try {
    const update = await Category.findOneAndUpdate({slug:req.params.slug},{$set: { name: req.body.category ,slug:slugify(req.body.category)}});
    console.log('updated',update);
    res.json(update);
} catch (error) {
    console.log('update error',error);
    res.send('Error in update');
}
};

const remove = async(req,res)=>{
try {
    const deleted = await Category.findOneAndDelete({slug:req.params.slug});
    console.log('deleted',deleted);
    res.status(200).json(deleted);
} catch (error) {
    console.log(error);
    res.status(400).send('Delete Failed');
}
};



module.exports = {create,list,read,update,remove};