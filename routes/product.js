const express = require("express");
const router = express.Router();

//middlewares
const { adminCheck } = require("../middlewares/auth");


//controller
const {Create,ListAll} = require("../controllers/product");

router.post("/product",adminCheck,Create);
router.get("/products/:count",ListAll);

module.exports = router;