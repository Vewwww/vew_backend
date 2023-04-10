const mongoose=require("mongoose")
const schema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
       },
    phoneNumber:{
        type:String,
        required:true,
    },
    carType:{
        type:String,
        requires:true,
        trim:true
    },
    isVerified:{
        type:Boolean
    },
    rate:{
        type:Number
    }
})
module.exports=mongoose.model(schema,"car")