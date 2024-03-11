const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getBooks,
  getPage404,
} = require("../controllers/homeController");

//router.Method('/router', heandler)
router.get("/", getHomepage);
router.get("/books", getBooks);
router.get("/page404", getPage404);

module.exports = router;
