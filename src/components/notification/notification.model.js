const mongoose = require("mongoose");
const schema=mongoose.Schema({
    message:{
        type:string
    },
    date:{
        type:Date
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:driver
    }
})
module.exports=mongoose.model("notification",schema)