const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const schema = mongoose.Schema({
  name: {
    type: String,
    required: ["name required",true],
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
  // passwordConfirmation: {
  //   type: String,
  //   required: [true, "password required"],
  // },
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
  numOfReports: {
    type: Number,
  },
  lisenceRenewalDate: {
    type: Date,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },

  LiscenceRenewalDate: {
    type: Date,
  },
});
schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
  next()
})

module.exports = mongoose.model("Driver", schema);

