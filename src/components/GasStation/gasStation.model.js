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
  location:{
    description: {
      ar: { type: String , default:"no arabic location description available"},
      en: { type: String , default:"no english location description available"},
    },
    latitude: {
      type: Number,
      required: [true, "Latitude required"],
    },
    longitude: {
      type: Number,
      required: [true, "Longitude required"],
    },
  }
});
module.exports = mongoose.model("gasStation", schema);
