const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getBooks,
  getPage404,
  postCreateUser,
  getCreate,
} = require("../controllers/homeController");

//router.Method('/router', heandler)
//GET
router.get("/", getHomepage);
router.get("/books", getBooks);
router.get("/page404", getPage404);
router.get("/create", getCreate);

//POST

router.post("/create-user", postCreateUser);

module.exports = router;
