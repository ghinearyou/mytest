const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  phone_number: {
    type: String
  },
  password: {
    type: String,
    min: 6
  },
  token: {
    type: String
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;