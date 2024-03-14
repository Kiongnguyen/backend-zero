const connection = require("../configs/database");

const getHomepage = (req, res) => {
  users = [];
  // A simple SELECT query
  connection.query("SELECT * from Users u", function (err, results, fields) {
    users = results;
    console.log(">>>resaulst>>>", results); // results contains rows returned by server
    res.send(JSON.stringify(users));
  });
};

const getBooks = (req, res) => {
  res.send("<h1>List books</h1>");
};

const getPage404 = (req, res) => {
  res.render("sample.ejs");
};

module.exports = {
  getHomepage,
  getBooks,
  getPage404,
};
