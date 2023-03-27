// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = { Role: mongoose.model("role", roleSchema) };
