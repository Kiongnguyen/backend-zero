const { deleteUserById } = require("../services/CRUDservices");
const User = require("../models/user");

const getHomepage = async (req, res) => {
  let results = await User.find({});
  return res.render("home.ejs", { listUses: results });
};

const getPage404 = (req, res) => {
  res.render("sample.ejs");
};

const getCreate = (req, res) => {
  res.render("create.ejs");
};

const getUpdate = async (req, res) => {
  const userId = req.params.id;
  let user = await User.findById(userId).exec();
  res.render("update.ejs", { userEdit: user });
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  await User.create({
    email: email,
    name: name,
    city: city,
  });

  res.redirect("/");
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  await User.updateOne(
    { _id: userId },
    {
      email: email,
      name: name,
      city: city,
    }
  );
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await User.findById(userId).exec();
  res.render("delete.ejs", { userEdit: user });
};
const postHandleRemoveUser = async (req, res) => {
  const id = req.body.userId;

  await User.deleteOne({ _id: id });
  res.redirect("/");
};

module.exports = {
  getHomepage,
  getPage404,
  postCreateUser,
  getCreate,
  getUpdate,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
