const connection = require("../configs/database");

const getHomepage = (req, res) => {
  res.render("home.ejs");
  // users = [];
  // // A simple SELECT query
  // connection.query("SELECT * from Users u", function (err, results, fields) {
  //   users = results;
  //   console.log(">>>resaulst>>>", results); // results contains rows returned by server
  //   res.send(JSON.stringify(users));
  // });
};

const getBooks = (req, res) => {
  res.send("<h1>List books</h1>");
};

const getPage404 = (req, res) => {
  res.render("sample.ejs");
};

const postCreateUser = (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  // let {email, name, city} = req.body;
  connection.query(
    `INSERT INTO Users (email, name, city) 
      VALUES (?,?,?)`,
    [email, name, city],
    function (err, results) {
      console.log(results);
      res.send("Create user succeed! ");
    }
  );
};

module.exports = {
  getHomepage,
  getBooks,
  getPage404,
  postCreateUser,
};
