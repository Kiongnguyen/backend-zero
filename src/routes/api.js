const express = require("express");
const routerAPI = express.Router();
const {
  getUserAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postloadsinglefileApi,
} = require("../controllers/apiController");

//GET
routerAPI.get("/", (req, res) => {
  res.send(" APIs ");
});

routerAPI.get("/users", getUserAPI);

//POST
routerAPI.post("/users", postCreateUserAPI);
routerAPI.post("/file", postloadsinglefileApi);

//PUT
routerAPI.put("/users", putUpdateUserAPI);

//DELETE
routerAPI.delete("/users", deleteUserAPI);

module.exports = routerAPI;
