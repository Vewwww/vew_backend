const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    ar: { type: String, required: [true, "Arabic Service name required"] },
    en: { type: String, required: [true, "English Service name required"] },
  },
});
module.exports = mongoose.model("service", schema);
