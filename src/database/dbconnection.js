const mongoose=require("mongoose")
require("dotenv").config({ path: "./config/.env" });
exports.dbConnection= ()=>{
    mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    })
}
