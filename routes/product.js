const express = require("express");
const router = express.Router();

//middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");


//controller
const {Create,ListAll,DeleteProduct,GetSingleProduct,ProductRating,GetProductRating,GetAverageRating,SearchFilters,addReview,getUser} = require("../controllers/product");

router.post("/product",adminCheck,Create);
router.get("/products/:count",ListAll);
router.get("/product/:slug",GetSingleProduct)
router.delete("/products/:slug",DeleteProduct);

//rating
router.post("/product/star/:productId",authCheck,ProductRating);

//get single product rating
router.post("/product/star/rated/:productId",authCheck,GetProductRating);

//get average rating single product
router.get("/product/star/average/:slug",GetAverageRating);

//search
router.post("/search/filters",SearchFilters);

//post review to a product
router.post("/product/review/:productId",authCheck,addReview)

//get all reviews of product
router.get("/product/get-review/:userId",getUser);

module.exports = router;