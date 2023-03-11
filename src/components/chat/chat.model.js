const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatShema =new Schema (
    {
        message:{
            type:String,
            required:[true,"message content name required"]
        },

        from:mongoose.Schema.Types.ObjectId,
        to:mongoose.Schema.Types.ObjectId,

        socketid:String
        
    },{timestamps:true}
)

const chat = mongoose.model ('Chat',chatShema)

module.exports = chat;