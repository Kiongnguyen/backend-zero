const User = require("../models/user");
const {
  uploadSingleFile,
  uploadMutlipleFile,
} = require("../services/fileServices");

const getUserAPI = async (req, res) => {
  let results = await User.find({});
    return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });
  return res.status(201).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  let user = await User.updateOne(
    { _id: userId },
    {
      email: email,
      name: name,
      city: city,
    }
  );
  return res.status(201).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  const id = req.body.userId;

  let result = await User.deleteOne({ _id: id });

  return res.status(201).json({
    errorCode: 0,
    data: result,
  });
};

const postloadsinglefileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  if (typeof req.files.image === "object" && Array.isArray(req.files.image)) {
    let result = await uploadMutlipleFile(req.files.image);
    console.log(">>>>result:", result);
  } else {
    let result = await uploadSingleFile(req.files.image);
    console.log(">>>>result:", result);
  }
};



module.exports = {
  getUserAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postloadsinglefileApi,
};
