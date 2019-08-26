var mongoose = require("mongoose");
/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String
});
const Users = mongoose.model("users", userSchema);

module.exports = Users;
