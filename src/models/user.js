const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  //_id===uid
  name: String,
  email: String,
  city: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
