require("dotenv").config(); //dotenv
const express = require("express"); //common js
const path = require("path"); //path
const mysql = require("mysql2"); //sql
const configViewengine = require("./configs/viewengine");
const webRoutes = require("./routes/web");

const app = express(); //app express
const port = process.env.PORT || 8080; //port
const hostname = process.env.HOST_NAME;

//config template engine
configViewengine(app);

//Routes
app.use("/", webRoutes);

//test connections
const connection = mysql.createConnection({
  host: "localhost",
  port: 3307, //default: 3306
  user: "root", //default: empty
  password: "123456",
  database: "hoidanit",
});
// A simple SELECT query
connection.query("SELECT * from Users u", function (err, results, fields) {
  console.log(">>>resaulst>>>", results); // results contains rows returned by server
  console.log(">>>fields>>>", fields); // fields contains extra meta data about results, if available
});

//app listen
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
