const mongoose = require("mongoose");
const schema = mongoose.Schema({
  code: {
    type: String,
    required: [true, "color code required"],
  },
  name: {
    en: { type: String, required: [true, "English color name required"] },
    ar: { type: String, required: [true, "Arabic color name required"] },
  },
});
module.exports = mongoose.model("color", schema);
