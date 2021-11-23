const router = require("express").Router();

//middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

//controller
const {saveDetails}  = require("../controllers/user");

router.post("/user/delivery/details",authCheck,saveDetails)

module.exports = router;
