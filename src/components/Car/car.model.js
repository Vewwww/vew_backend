const mongoose = require("mongoose")
const schema = mongoose.Schema({
    carType: {
        type: mongoose.Types.ObjectId,
        ref:"carType",
        trim:true
    },
    carModel: {
        type: String,
        trim:true
    },
    year: {
        type: String
    },
    plateNumber: {
        type: String
    },
    licenseRenewalDate: {
        type: Date
    },
    color: {
        type: String
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
        ref:"location"
    }
})
module.exports = mongoose.model(schema, "car")