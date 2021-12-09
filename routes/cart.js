const express = require("express");

const router = express.Router();

//middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

//controllers
const {userCart,getUserCart,deleteUserCart}  = require("../controllers/userCart");

router.post("/user/cart",authCheck,userCart);

router.get("/user/cart/:email",getUserCart);

//deleting cart
router.delete("/user/cart/delete/:Id",deleteUserCart)


module.exports = router;
