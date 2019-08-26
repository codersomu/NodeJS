const mongoose = require("mongoose");
const UsersCol = require("../schema/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ValidUserRegistration, ValidLogin } = require("../validation/");

class User {
  constructor() {
    console.log("User class");
  }
  static getUserList() {}

  async addUser(data) {
    const validation = await ValidUserRegistration(data);
    if (validation !== null) {
      return Promise.reject(validation.details[0].message);
    }

    const alreadyExist = await UsersCol.findOne({ username: data.username });
    if (alreadyExist) {
      return Promise.reject("Email already exist");
    }

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const userCollection = new UsersCol(data);
    const result = await userCollection.save();
    return Promise.resolve(result);
  }

  async checkLogin(data) {
    const isValid = await ValidLogin(data);
    console.log("isValid", isValid);

    if (isValid !== null) {
      return Promise.reject(isValid.details[0].message);
    }
    console.log("after validation");

    const userDetails = await UsersCol.findOne({ username: data.username });
    if (!userDetails) {
      return Promise.reject("Invalid username or password");
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      userDetails.password
    );
    if (!isValidPassword) {
      return Promise.reject("Invalid password");
    }

    const token = jwt.sign({ _id: userDetails._id }, process.env.TOKEN_SECRET);
    return Promise.resolve(token);
  }
}

module.exports = User;
