const express = require("express");
const router = express.Router();

//middlewares
const { adminCheck } = require("../middlewares/auth");

//controller
const {
  create,
  list,
  read,
  update,
  remove,
  getSubcategory
} = require("../controllers/category");

//routes
router.post("/category", adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", adminCheck, read);
router.put("/category/:slug", adminCheck, update);
router.delete("/category/:slug", adminCheck, remove);
// router.get("/category/subcategory/:_id",getSubcategory);
module.exports = router;
