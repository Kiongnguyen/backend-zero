const connection = require("../configs/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  CreateNewUser,
  deleteUserById,
} = require("../services/CRUDservices");

const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUses: results });
};

const getBooks = (req, res) => {
  res.send("<h1>List books</h1>");
};

const getPage404 = (req, res) => {
  res.render("sample.ejs");
};

const getCreate = (req, res) => {
  res.render("create.ejs");
};

const getUpdate = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("update.ejs", { userEdit: user });
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  // let {email, name, city} = req.body;

  await CreateNewUser(email, name, city);

  // res.send("Create user succeed! ");
  res.redirect("/");
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  await updateUserById(email, name, city, userId);
  // res.send("Update user succeed! ");
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("delete.ejs", { userEdit: user });
};
const postHandleRemoveUser = async (req, res) => {
  const id = req.body.userId;

  await deleteUserById(id);
  // res.send("Oke deleted! ");
  res.redirect("/");
};

module.exports = {
  getHomepage,
  getBooks,
  getPage404,
  postCreateUser,
  getCreate,
  getUpdate,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
