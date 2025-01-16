const express = require("express");
const categoryController = require("../controllers/Category");
const router = express.Router();

router
  .get("/", categoryController.getAll)
  .delete("/:id", categoryController.deleteCategory)
  .post("/", categoryController.createCategory)
  .patch("/:id", categoryController.updateCategory);

module.exports = router;
