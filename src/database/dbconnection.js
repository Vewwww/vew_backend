const mongoose = require('mongoose');
require("dotenv").config({path:"../../config/.env"});

module.exports =  mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>{
        console.log("connected to db");
    })
    .catch((error)=>{
        console.log("failed to connnect to db \n" , error)
    })