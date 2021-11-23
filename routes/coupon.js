const express = require("express");
const router = express.Router();

//middlewares
const { adminCheck,authCheck } = require("../middlewares/auth");

//controller
const {
 create,
 remove,
 list,
 verifyCoupon
} = require("../controllers/coupon");

//routes
router.post("/coupon/create",adminCheck,create);
router.delete("/coupon/remove/:couponId",adminCheck,remove);
router.get("/coupon/list",list);
router.post("/coupon/verify",authCheck,verifyCoupon)

module.exports = router;
