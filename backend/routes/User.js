const express = require("express");
const userController = require("../controllers/User");
const router = express.Router();

router
  .get("/:id", userController.getById)
  .patch("/:id", userController.updateById)
  .post("/contact", userController.contactUs);

module.exports = router;
