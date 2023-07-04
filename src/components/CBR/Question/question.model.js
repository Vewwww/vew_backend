const mongoose = require("mongoose")
const schema = mongoose.Schema({
    category: {
        type: String,
        trim: true
    },
    questions: [{
        subQuestion: { type: String, trim: true },
        yesKeywords: [],
        noKeywords: []
    }]

})
module.exports = mongoose.model("question", schema)