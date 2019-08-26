const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  course_name: String,
  description: String,
  start_date: {
    type: Date
  },
  end_date: String,
  author_id: String
});

module.exports = mongoose.model("courses", schema);
