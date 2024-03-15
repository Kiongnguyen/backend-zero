const connection = require("../configs/database");

const getAllUsers = async (req, res) => {
  let [results, fields] = await connection.query("SELECT * from Users u");
  return results;
};

module.exports = {
  getAllUsers,
};
