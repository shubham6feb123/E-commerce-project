const express = require("express");

const router = express.Router();

//middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

//controllers
const {userCart,getUserCart}  = require("../controllers/userCart");

router.post("/user/cart",authCheck,userCart);

router.get("/user/cart/:email",getUserCart);


module.exports = router;
