const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    ar: { type: String, required: [true, "Arabic carType name required"] },
    en: { type: String, required: [true, "English carType name required"] },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  carType: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "carType",
    },
  ],
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "location",
  },
  isVerified: {
    type: Boolean,
  },
  rate: {
    type: Number,
  },
  ratesNumber: {
    type: Number,
  },
});
module.exports = mongoose.model("MaintenanceCenter", schema);
