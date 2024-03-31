const express = require("express");
const routerAPI = express.Router();
const {
  getUserAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
} = require("../controllers/apiController");

//GET
routerAPI.get("/", (req, res) => {
  res.send(" APIs ");
});

routerAPI.get("/users", getUserAPI);

//POST
routerAPI.post("/users", postCreateUserAPI);

//PUT
routerAPI.put("/users", putUpdateUserAPI);

//DELETE
routerAPI.delete("/users", deleteUserAPI);

module.exports = routerAPI;
