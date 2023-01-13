const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    zipCode: Number,
  }); // create mongoose schema with mongoose.Schema() constructor

module.exports = mongoose.model("Subscriber", subscriberSchema);
// create and export the class
