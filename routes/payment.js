const express = require("express");
const router = express.Router();

//middlewares
const { adminCheck,authCheck } = require("../middlewares/auth");

//controller
const {
    verifyUser
} = require("../controllers/payment");

//routes
router.post("/payment/user/verify",verifyUser)

module.exports = router;