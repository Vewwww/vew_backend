const mongoose = require("mongoose")
const schema = mongoose.Schema({
    carType: {
        type: mongoose.Types.ObjectId,
        ref:"carType",
        trim:true
    },
    carModel: {
        type: mongoose.Types.ObjectId,
        ref:"carModel"
    },
    year: {
        type: String
    },
    plateNumber: {
        type: String
    },
    CarLicenseRenewalDate: {
        type: Date
    },
    color: {
        type: mongoose.Types.ObjectId,
        ref:"color"
    },
    miles: {
        type: Number
    },
    averageMilesPerMonth: {
        type: Number
    },
    lastPeriodicMaintenanceDate: {
        type: Date,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"driver"
    },
    carLicenseRenewalNotifition:{
        type:mongoose.Types.ObjectId,
        ref:"notification"
    },
    periodicMaintenanceNotification:{
        type:mongoose.Types.ObjectId,
        ref:"notification"
    }
})
module.exports = mongoose.model("car",schema)