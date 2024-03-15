const connection = require("../configs/database");

const getAllUsers = async (req, res) => {
  let [results, fields] = await connection.query("SELECT * from Users u");
  return results;
};

const getUserById = async (userId) => {
  let [results, fields] = await connection.query(
    "SELECT * from Users where id=?",
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};
  return user;
};
module.exports = {
  getAllUsers,
  getUserById,
};
