const subCategory = require("../models/subcategory");
const slugify = require('slugify');


const create = async(req,res)=>{
try {

    const {name,parent} = req.body;
    // console.log("sub categories credentials",name,parent)
const category = await new subCategory({
    name:name,
    slug:slugify(name),
  parent:parent
}).save();

res.json(category);

} catch (error) {
    console.log(error);
    res.status(400).send('create subCategory failed');
}
};

const list = async(req,res)=>{
try {
    const categoryList = await subCategory.find({}).sort({createdAt:-1});
res.json(categoryList);
} catch (error) {
    res.json(error);
}
};

const read = async(req,res)=>{
try {
    const category = await subCategory.findOne({slug:req.params.slug})
    res.json(category)
} catch (error) {
    res.json(error)
}
};

const update = async(req,res)=>{
try {
    const update = await subCategory.findOneAndUpdate({slug:req.params.slug},{$set: { name: req.body.category ,slug:slugify(req.body.category)}});
    console.log('updated',update);
    res.json(update);
} catch (error) {
    console.log('update error',error);
    res.send('Error in update');
}
};

const remove = async(req,res)=>{
try {
    const deleted = await subCategory.findOneAndDelete({slug:req.params.slug});
    console.log('deleted',deleted);
    res.status(200).json(deleted);
} catch (error) {
    console.log(error);
    res.status(400).send('Delete Failed');
}
};

//getting all  the subcategories with their parent category id
const getSubcategories = async(req,res)=>{
    try {
        const subcategories = await subCategory.find({parent:req.params._id})
        // console.log("all the subcategories with the parent category",subcategories);
        res.status(200).json(subcategories);
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed to get Subcategories");
    }
}

module.exports = {create,list,read,update,remove,getSubcategories};

