const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name required"],
    trim: true,
    minlength: [3, "too short name"],
    maxlength: [15, "too long name"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    trim: true,
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "password required"],
    minlength: [6, "minlength 6 characters"],
  },
  changedPasswordAt: Date,
  phoneNumber: {
    type: String,
    required: [true, "phone required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: { values: ["male", "female"] },
    required: [true, "gender is required"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default:"user"
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
  lisenceRenewalDate: {
    type: Date,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  emailConfirm:{
    type:Boolean,
    default:false
  },
  logedIn:{
    type:Boolean,
    default:false
  }
});
schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
  next()
})
schema.pre('findOneAndUpdate', async function () {
  if (!this._update.password) return;
  this._update.password = await bcrypt.hash(this._update.password, Number(process.env.ROUND));
})
module.exports = mongoose.model("driver", schema);

