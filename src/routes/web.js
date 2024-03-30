const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getPage404,
  postCreateUser,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
  getCreate,
  getUpdate,
} = require("../controllers/homeController");

//GET
router.get("/", getHomepage);
router.get("/page404", getPage404);
router.get("/create", getCreate);
router.get("/update/:id", getUpdate);

//POST

router.post("/create-user", postCreateUser);
router.post("/update-user", postUpdateUser);
router.post("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleRemoveUser);

module.exports = router;
