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
  getSubcategories
} = require("../controllers/subcategory");

//routes
router.post("/subcategory", adminCheck, create);
router.get("/subcategories", list);
router.get("/subcategory/:slug", adminCheck, read);
router.put("/subcategory/:slug", adminCheck, update);
router.delete("/subcategory/:slug", adminCheck, remove);

//getting all the subcategories with the parent category id
router.get("/subcategories/:_id",getSubcategories);

module.exports = router;
