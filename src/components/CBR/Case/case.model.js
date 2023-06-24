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
});
module.exports = mongoose.model("case", schema);
