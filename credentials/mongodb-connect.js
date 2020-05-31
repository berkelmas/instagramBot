const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { db: mongoose.connection, mongoConnectionString };
