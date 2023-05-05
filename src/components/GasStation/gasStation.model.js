const mongoose=require("mongoose")
const schema=mongoose.Schema({
   name:{
    en_name: {
        type:String,
        trim:true,
        required:true
      },
      ar_name: {
        type:String,
    trim:true,
    required:true
      }
   
   },
   rate:{
    type:Number
   },
   location:{
    type:mongoose.Types.ObjectId,
    ref:"location"
   }
})
module.exports=mongoose.model("gasStation",schema)