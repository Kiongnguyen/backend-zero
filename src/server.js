require("dotenv").config(); //dotenv
const express = require("express"); //common js
const path = require("path"); //path
const configViewengine = require("./configs/viewengine");
const webRoutes = require("./routes/web");

const app = express(); //app express
const port = process.env.PORT || 8080; //port
const hostname = process.env.HOST_NAME;

//config template engine
configViewengine(app);

//Routes
app.use("/", webRoutes);

//app listen
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
