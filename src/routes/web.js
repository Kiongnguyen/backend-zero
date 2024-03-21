const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getBooks,
  getPage404,
  postCreateUser,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
  getCreate,
  getUpdate,
} = require("../controllers/homeController");

//router.Method('/router', heandler)
//GET
router.get("/", getHomepage);
router.get("/books", getBooks);
router.get("/page404", getPage404);
router.get("/create", getCreate);
router.get("/update/:id", getUpdate);

//POST

router.post("/create-user", postCreateUser);
router.post("/update-user", postUpdateUser);
router.post("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleRemoveUser);

module.exports = router;
