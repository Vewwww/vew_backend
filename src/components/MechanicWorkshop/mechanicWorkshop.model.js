const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema({
  ownerName: {
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
  mechanicPhone: {
    type: String,
    require: [true, "mechanic phone number is required"],
  },
  name: {
    type: String,
    require: [true, "workshop name is required"],
  },
  phoneNumber: {
    type: String,
    require: [true, "workshop phone number is required"],
  },
  hasDelivery: {
    type: Boolean,
    require: [true, "has delivery is required"],
  },
  service: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "service",
    },
  ],
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
});
schema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
    next()
  })
  schema.pre('findOneAndUpdate', async function () {
    if (!this._update.password) return;
    this._update.password = await bcrypt.hash(this._update.password, Number(process.env.ROUND));
  })
module.exports = mongoose.model("mechanicWorkshop", schema);
