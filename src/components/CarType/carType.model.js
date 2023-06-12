const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    ar: { type: String, required: [true, "Arabic carType name required"] },
    en: { type: String, required: [true, "English carType name required"] },
  },
});
module.exports = mongoose.model("carType", schema);
