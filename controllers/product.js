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
      // .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subcategories")
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
    const singleProduct = await product.findOne({ slug: req.params.slug }).populate("category").exec();
    res.status(200).json(singleProduct);
    // console.log("single product page k liye",singleProduct)
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
    // console.log("slug from avg rating", req.params.slug);
    const singleProduct = await product.findOne({ slug: req.params.slug });
    const avgRating = singleProduct.rating.reduce(
      (previousValue, currentValue) => previousValue + currentValue.star,
      0
    );
    // console.log("average rating", avgRating);
    // console.log("no. users rated", singleProduct.rating.length);
    res.status(200).json({
      avg: avgRating / singleProduct.rating.length,
      allUsers: singleProduct.rating.length,
    });
  } catch (error) {
    // console.log("err to get avg rating", error);
  }
};

//HANDELING SEARCH QUERY
const handleQuery = async (res, req, query) => {
  try {
    const products = await product
      .find({ $text: { $search: query } })
      .populate("category")
      .populate("subcategories")
      .populate("postedBy")
      .exec();
    if (products.length > 0) {
      res.json(products);
    } else {
      throw new Error("product not found");
    }
  } catch (error) {
    // console.log(error.message);
    res.status(404).json(error);
  }
};

//HANDELING PRICE QUERY
const handlePrice = async (res, req, price) => {
  try {
    const products = await product
      .find({ price: { $gte: price[0], $lte: price[1] } })
      .populate("category")
      .populate("subcategories")
      .populate("postedBy")
      .exec();
    // console.log("products price",products)
    
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      throw new Error("product not found");
    }
  } catch (error) {
    // console.log(error.message);
    res.status(404).json(error);
  }
};

//HANDELING CATEGORY QUERY
const handleCategory = async (res, req, category) => {
  try {
    const products = await product
      .find({ category })
      .populate("category")
      .populate("subcategories")
      .populate("postedBy")
      .exec();
    // console.log("category search",products.data)
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      throw new Error("product not found");
    }
  } catch (error) {
    // console.log(error.message);
    res.status(404).json(error);
  }
};

//HANDELING BRAND QUERY
const handleBrand = async (res, req, brand) => {
  // console.log(brand)
  try {
    const products = await product
      .find({ brand })
      .populate("category")
      .populate("subcategories")
      .populate("postedBy")
      .exec();
    // console.log("category search",products.data)
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      throw new Error("product not found");
    }
  } catch (error) {
    // console.log(error.message);
    res.status(404).json(error);
  }
};

//HANDELING STARS QUERY
const handleStar = (res, req, stars) => {
  try {
    product
      .aggregate([
        {
          $project: {
            document: "$$ROOT",
            floorAverage: {
              $floor: { $avg: "$rating.star" },
            },
          },
        },
        {
          $match: { floorAverage: stars },
        },
      ])
      .exec((err, aggregates) => {
        if (err) {
          console.log("AGGREGATES ERROR", err);
        } else {
          product
            .find({ _id: aggregates })
            .populate("category")
            .populate("subcategories")
            .populate("postedBy")
            .exec((err, products) => {
              if (err) {
                res.status(403).json({ error: err });
              } else {
                res.status(200).json(products);
              }
            });
          // res.status(200).json(aggregates)
        }
      });
  } catch (error) {
    // console.log(error.message);
    res.status(403).json({ error: error });
  }
};

//SEARCH/FILTERS
exports.SearchFilters = async (req, res) => {
  const { query, price, category, brand, stars } = req.body;
  // console.log("query",query);
  if (query) {
    // console.log("query", query);
    await handleQuery(res, req, query);
  }

  if (price !== undefined) {
    await handlePrice(res, req, price);
    // console.log("price : ", price);
  }

  if (category) {
    // console.log("category", category);
    await handleCategory(res, req, category);
  }

  if (brand) {
    // const lower = brand.toLowerCase();
    await handleBrand(res, req, brand);
  }

  if (stars) {
    // console.log("stars", stars);
    handleStar(res, req, stars);
  }
};

//handling review
exports.addReview = async (req, res) => {
  try {
    const products = await product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { review } = req.body;
    //if reviews exist
    let existingReviewObject = products.review.find(
      (element) => element.postedBy.toString() === user._id.toString()
    );

    if (existingReviewObject === undefined) {
      //add review
      let reviewAdded = await product.findByIdAndUpdate(
        { _id: req.params.productId },
        {
          $push: { review: { message: review, postedBy: user._id } },
        },
        { new: true }
      );

      // console.log("review added", reviewAdded);
      res.status(200).json(reviewAdded);
    } else {
      throw new Error("review already added");
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

//get all reviews
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    res.json({ role: user.role, name: user.name });
  } catch (error) {
    console.log("yet not rated", error);
    res.status(400).json(error);
  }
};
