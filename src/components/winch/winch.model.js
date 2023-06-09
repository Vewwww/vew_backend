const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "owner name is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
  },
  password: {
    type: String,
    require: [true, "password is required"],
    min: 6,
  },
  phoneNumber: {
    type: String,
    require: [true, "phone number is required"],
  },
  plateNumber: {
    type: String,
    require: [true, "plate number is required"],
  },
  report: {
    reportsNumber: {
      type: Number,
      default: 0,
    },
    dateReport: {
      type: Date,
      default: function () {
        return Date.now();
      },
    },
  },
  rate: {
    type: Number,
    default: 4.5,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  emailConfirm: {
    type: Boolean,
    default: false,
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "location",
  },
  logedIn:{
    type:Boolean,
    default:false
  }
});
schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
  next();
});

module.exports = mongoose.model("Winch", schema);
