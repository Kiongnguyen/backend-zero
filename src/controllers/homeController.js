const getHomepage = (req, res) => {
  res.send("Hello World! and Kiong");
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
