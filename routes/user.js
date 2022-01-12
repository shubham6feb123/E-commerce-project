const router = require("express").Router();

//middlewares
const { authCheck } = require("../middlewares/auth");

//controller
const {saveDetails,createOrder,getAllOrders,sendMail}  = require("../controllers/user");

router.post("/user/delivery/details",authCheck,saveDetails)

//order details
router.post("/user/order",authCheck,createOrder)

//getting orders
router.post("/user/orders",authCheck,getAllOrders);

//support mail
router.post("/user/support/mail",authCheck,sendMail)

module.exports = router;
