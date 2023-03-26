const mongoose = require("mongoose");
// const {Schema, model} = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
