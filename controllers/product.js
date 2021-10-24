const product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");

exports.Create = async (req, res) => {
  try {
    // console.log("product data", req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new product(req.body).save();
    res.status(200).json(newProduct);
  } catch (error) {
    // console.log(error);
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
      .sort([["createdAt", "desc"]])
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    const productDeleted = await product.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(200).json(productDeleted);
  } catch (error) {
    // console.log("error in product deletion");
    res.status(400).json(error);
  }
};

exports.GetSingleProduct = async (req, res) => {
  try {
    const singleProduct = await product.findOne({ slug: req.params.slug });
    res.status(200).json(singleProduct);
  } catch (error) {
    // console.log("error in fetching product");
    res.status(400).json(error);
  }
};

//rating controller
exports.ProductRating = async (req, res) => {
  try {
    const products = await product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;
    // console.log("star rating",star,user)
    //who's updating
    //check if currently logged in user have already added rating to this product?
    let existingRatingObject = products.rating.find(
      (element) => element.postedBy.toString() === user._id.toString()
    );
    //if user haven't left rating yet then push it
    if (existingRatingObject === undefined) {
      let ratingAdded = await product.findByIdAndUpdate(
        { _id: req.params.productId },
        {
          $push: { rating: { star: star, postedBy: user._id } },
        },
        { new: true }
      );

      // console.log("ratings added", ratingAdded);
      res.status(200).json(ratingAdded);
    }
    //  else {
    //   //if user already rated then give it to frontend

    //   console.log("give rating",existingRatingObject);
    //   res.json(existingRatingObject)
    // }
  } catch (error) {
    // console.log("error from rating ",error.message)
  }
};

//get rating
exports.GetProductRating = async (req, res) => {
  try {
    const singleProduct = await product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    let existingRatingObject = singleProduct.rating.find(
      (element) => element.postedBy.toString() === user._id.toString()
    );
    // console.log("existingRatingObject",existingRatingObject);
    if (existingRatingObject !== undefined) {
      // console.log("existingRatingObject from inside if else ",existingRatingObject)
      res.status(200).json(existingRatingObject);
    } else {
      throw "not rated yet";
    }
  } catch (error) {
    // console.log("yet not rated",error.message)
    res.status(400).json(error);
  }
};

//get average rating
exports.GetAverageRating = async (req, res) => {
  try {
    console.log("slug from avg rating", req.params.slug);
    const singleProduct = await product.findOne({ slug: req.params.slug });
    const avgRating = singleProduct.rating.reduce(
      (previousValue, currentValue) => previousValue + currentValue.star,
      0
    );
    // console.log("average rating", avgRating);
    // console.log("no. users rated", singleProduct.rating.length);
    res.status(200).json({ avg: avgRating / singleProduct.rating.length,allUsers:singleProduct.rating.length });
  } catch (error) {
    // console.log("err to get avg rating", error);
  }
};
