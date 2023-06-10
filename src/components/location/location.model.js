const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  description: {
    ar: { type: String, required: [true, "Arabic description required"] },
    en: { type: String, required: [true, "English description required"] },
  },
  latitude: {
    type: Number,
    required: [true, "Latitude required"],
  },
  longitude: {
    type: Number,
    required: [true, "Longitude required"],
  },
});
module.exports = mongoose.model("location", schema);
