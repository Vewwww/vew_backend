const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  rate: {
    type: Number,
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "location",
  },
});
module.exports = mongoose.model("gasStation", schema);
