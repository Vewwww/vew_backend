const mongoose = require("mongoose")
const schema = mongoose.Schema({
    question: {
        type: String,
        trim: true
    },
    choises: [{
        choise: { type: String, trim: true },
        keywords: []
    }]

})
module.exports = mongoose.model("question", schema)