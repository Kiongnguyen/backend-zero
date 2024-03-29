require("dotenv").config(); //dotenv
const express = require("express"); //common js
const path = require("path"); //path
const connection = require("./configs/database");
const configViewengine = require("./configs/viewengine");
const webRoutes = require("./routes/web");
const mongoose = require("mongoose");

const app = express(); //app express
const port = process.env.PORT || 8080; //port
const hostname = process.env.HOST_NAME;

//config template engine
configViewengine(app);

//config req.body
app.use(express.json()); //for JSON
app.use(express.urlencoded({ extended: true })); //for from data

//Routes
app.use("/", webRoutes);

const kittySchema = new mongoose.Schema({
  name: String,
});

const Kitten = mongoose.model("Kitten", kittySchema);
const silence = new Kitten({ name: "Kiong" });
silence.save();

//connection
(async () => {
  try {
    await connection();
    //app listen
    app.listen(port, hostname, () => {
      console.log(`Beckend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>>> Error connect to DB: ", error);
  }
})();
