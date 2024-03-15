const connection = require("../configs/database");

const getHomepage = (req, res) => {
  res.render("home.ejs");
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

  // const [results, fields] = await connection.query("SELECT * from Users u");
  // console.log(">>>resaulst>>>", results);
};

module.exports = {
  getHomepage,
  getBooks,
  getPage404,
  postCreateUser,
  getCreate,
};
