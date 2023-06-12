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
  location: { type: mongoose.Types.ObjectId, ref: "location" },
  mechanist: { type: mongoose.Types.ObjectId, ref: "mechanicWorkshop" },
  winch: { type: mongoose.Types.ObjectId, ref: "winch" },

  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("request", schema);
//car,location,rideid,winch or mechanic id,accepted