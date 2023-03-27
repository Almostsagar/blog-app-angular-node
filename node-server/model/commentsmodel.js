// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  // post: {
  //   type: Schema.Types.ObjectId,
  //   ref: "post",
  // },
  date: {
    type: Date,
    default: Date.now(),
  },
  commentisapproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = { Comment: mongoose.model("comment", commentsSchema) };
