const express = require("express");
const router = express.Router();

//middlewares
const { adminCheck } = require("../middlewares/auth");


//controller
const {Create,ListAll,DeleteProduct,GetSingleProduct} = require("../controllers/product");

router.post("/product",adminCheck,Create);
router.get("/products/:count",ListAll);
router.get("/product/:slug",GetSingleProduct)
router.delete("/products/:slug",DeleteProduct);

module.exports = router;