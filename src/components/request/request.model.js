const mongoose = require("mongoose");

//isactive false | accepted false      || pending request [user]  || upcoming request [mechanic]
//isActive true  | accepted true       || current request [user]  || Accepted request
//isactive false | accepted true       || previos request [user]  ||
const schema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  service: {
    type: mongoose.Types.ObjectId,
    ref: "service",
  },
  driver: { type: mongoose.Types.ObjectId, ref: "driver" },
  car: { type: mongoose.Types.ObjectId, ref: "car" },
  mechanic: { type: mongoose.Types.ObjectId, ref: "mechanicWorkshop" },
  winch: { type: mongoose.Types.ObjectId, ref: "winch" },
  location: {
    description: {
      ar: { type: String, default: "no arabic location description available" },
      en: {
        type: String,
        default: "no english location description available",
      },
    },
    latitude: {
      type: Number,
      require: [true, "Latitude required"],
    },
    longitude: {
      type: Number,
      require: [true, "Longitude required"],
    },
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("request", schema);
//car,location,rideid,winch or mechanic id,accepted
