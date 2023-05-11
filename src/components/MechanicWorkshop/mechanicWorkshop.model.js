const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const schema = new mongoose.Schema({
    ownerName: {
        type: String,
        require: [true,"owner name is required"],
    },
    email: {
        type: String,
        require:  [true,"email is required"],
    },
    password: {
        type: String,
        require:  [true,"password is required"],
        min: 6
    },
    mechanicPhone: {
        type: String,
        require:  [true,"mechanic phone number is required"],
    },
    name: {
        type: String,
        require:  [true,"workshop name is required"],
    },
    phoneNumber: {
        type: String,
        require:  [true,"workshop phone number is required"],
    },
    hasDelivery: {
        type: Boolean,
        require:  [true,"has delivery is required"]
    },
    services:[],
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
        default: 4.5
    },
    isSuspended: {
        type: Boolean,
        default: false,
    },
    emailConfirm:{
        type:Boolean,
        default:false
      }
});
schema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
    next()
  })
module.exports = mongoose.model("mechanic workshop", schema);