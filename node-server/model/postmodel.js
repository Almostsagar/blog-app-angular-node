// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  imageSrc: { type: String },
  status: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, default: Date.now() },
  updationDate: { type: Date },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comment",
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  }
});

module.exports = { Post: mongoose.model("post", postSchema) };
