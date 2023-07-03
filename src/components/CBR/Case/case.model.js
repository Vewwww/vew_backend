const mongoose = require("mongoose");
const schema = mongoose.Schema({
    caseKeyWords: [],
    solution: {
        type: String,
        trim: true,
    },
    serviceId: {
        type: mongoose.Schema.ObjectId,
        ref: "service",
    },
    maintenanceCenter: Boolean,
    mechanic: Boolean,
    gasStation: Boolean
});
module.exports = mongoose.model("case", schema);
