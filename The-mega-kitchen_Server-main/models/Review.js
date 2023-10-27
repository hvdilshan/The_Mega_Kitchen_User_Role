const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

mongoose.model("Review", reviewSchema);
