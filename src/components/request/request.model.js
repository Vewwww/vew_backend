const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
  },
  from:mongoose.Schema.Types.ObjectId,
  to:mongoose.Schema.Types.ObjectId,

  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("request", schema);
