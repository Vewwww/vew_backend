const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  ownerName: {
    type: String,
    require:  [true,"owner name is required"],
  },
  email: {
    type: String,
    require:  [true,"email is required"],
  },
  password: {
    type: String,
    require:  [true,"password is required"],
    min:6
  },
  phoneNumber:{
    type:String,
    require: [true,"phone number is required"],
  },
  plateNumber:{
    type: String,
    require: [true,"plate number is required"]
  },
  report:{
  reportsNumber:{
    type:Number,
    default:0
  },
  dateReport: {
    type: Date,
    default: function(){return Date.now()}
}
},
  rate: {
    type: Number,
    default:4.5
  },
  isSuspended: {
    type: Boolean,
    default:false,
  },
  isActive: {
    type: Boolean,
    default:false,
  },
});

module.exports = mongoose.model("Winch", schema);