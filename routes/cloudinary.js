const express = require("express");
const router = express.Router();

//middlewares
const {adminCheck} = require("../middlewares/auth");

//controllers
const {upload,remove} = require("../controllers/cloudinary");

//routes
router.post("/uploadImages",adminCheck,upload);
router.post("/deleteImage",adminCheck,remove);

module.exports = router;