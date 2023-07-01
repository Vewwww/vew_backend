const mongoose = require("mongoose")
const schema = mongoose.Schema({
    question: {
        type: String,
        trim: true
    },
    choices: [{
        choice: { type: String, trim: true },
        keywords: []
    }]

})
module.exports = mongoose.model("question", schema)