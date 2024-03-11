const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World! and nodemon");
});

router.get("/books", (req, res) => {
  res.send("<h1>List books</h1>");
});

router.get("/post", (req, res) => {
  res.render("sample.ejs");
});

module.exports = router;
