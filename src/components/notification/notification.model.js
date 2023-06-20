const mongoose = require("mongoose");
const schema=mongoose.Schema({
    message:{
        type:String
    },
    date:{
        type:Date
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"driver"
    },
    seen:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model("notification",schema)