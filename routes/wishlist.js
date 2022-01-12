const express = require("express");

const router = express.Router();

//middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

//controller
const {addToWishList,getWishList,deleteWishList}  = require("../controllers/wishlist");

router.post("/user/wishlist",authCheck,addToWishList);
router.post("/user/get-wishlist",authCheck,getWishList);
router.put("/user/wishlist/:productId",authCheck,deleteWishList)

module.exports = router;