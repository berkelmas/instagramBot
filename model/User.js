const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  username: String,
});

module.exports = mongoose.model("User", UserScheme);
