const product = require("../models/product");
const slugify = require("slugify");

exports.Create = async (req, res) => {
  try {
    console.log("product data", req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new product(req.body).save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(401).send("Product Creation Failed");
  }
};

exports.ListAll = async (req, res) => {
  try {
    const products = await product
      .find({})
      .limit(parseInt(req.params.count))
      .populate("Category")
      .populate("subCategory")
      .sort([["createdAt","desc"]])
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};
