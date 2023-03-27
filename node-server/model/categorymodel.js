// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
},
});

module.exports = { Category: mongoose.model("category", categorySchema) };
