const connection = require("../configs/database");
const { getAllUsers, getUserById } = require("../services/CRUDservices");

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

  let [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city) VALUES (?,?,?)`,
    [email, name, city]
  );
  console.log(results);
  res.send("Create user succeed! ");
};

module.exports = {
  getHomepage,
  getBooks,
  getPage404,
  postCreateUser,
  getCreate,
  getUpdate,
};
