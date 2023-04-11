const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    ar: { type: String, required: [true, "arabic carType name required"] },
    en: { type: String, required: [true, "arabic carType name required"] },
  },
});
module.exports = mongoose.model("CarType", schema);
