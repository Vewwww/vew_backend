const mongoose = require("mongoose");
const schema = mongoose.Schema({
    problem: { type: String },
    solution: { type: String, default: "" },
    isSolved: { type: Boolean, default: false }
});
module.exports = mongoose.model("problem", schema);
