const mongoose = require("mongoose");

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
    workshopName: {
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
});

module.exports = mongoose.model("mechanic workshop", schema);