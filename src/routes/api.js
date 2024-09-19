const express = require("express");
const routerAPI = express.Router();
const {
  getUserAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postloadsinglefileApi,
} = require("../controllers/apiController");

const {
  postCustomerApi, 
  postArrayCustomerApi,
  getAllCustomersApi,
  putUpdateCustomerAPI,
  deleteCustomerAPI,
  deleteArrayCustomerAPI
} = require("../controllers/customerController")

//GET
routerAPI.get("/", (req, res) => {
  res.send(" APIs ");
});

routerAPI.get("/users", getUserAPI);

routerAPI.get("/customers", getAllCustomersApi);


//POST
routerAPI.post("/users", postCreateUserAPI);
routerAPI.post("/file", postloadsinglefileApi);

routerAPI.post("/customers", postCustomerApi);
routerAPI.post("/customers-many", postArrayCustomerApi);


//PUT
routerAPI.put("/users", putUpdateUserAPI);

routerAPI.put("/customer", putUpdateCustomerAPI);

//DELETE
routerAPI.delete("/users", deleteUserAPI);

routerAPI.delete("/customer", deleteCustomerAPI);
routerAPI.delete("/customers-many", deleteArrayCustomerAPI);

//Test Query 
routerAPI.get("/info", (req,res) => {
  console.log("Check query>>>:",res.query)
  return res.status(200).json({
    data: req.query
  })
});

routerAPI.get("/info/:name/:address", (req,res) => {
  console.log("Check query>>>:",res.params)
  return res.status(200).json({
    data: req.params
  })
});


module.exports = routerAPI;
