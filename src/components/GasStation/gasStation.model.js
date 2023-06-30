const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    ar: { type: String, required: [true, "Arabic maintenance name required"] },
    en: { type: String, required: [true, "English maintenance name required"] },
  },
  rate: {
    type: Number,
  },
  location:{
    description: {
      ar: { type: String , default:"no arabic location description available"},
      en: { type: String , default:"no english location description available"},
    },
    latitude: {
      type: Number,
      require: [true, "Latitude required"],
    },
    longitude: {
      type: Number,
      require: [true, "Longitude required"],
    },
  }
});
module.exports = mongoose.model("gasStation", schema);
