const express =require('express');
const app = express();

require("dotenv").config({path:"../../config/.env"});

const connectDB =require('./src/database/dbconnection');

app.listen(process.env.PORT,()=>{
    connectDB;
    console.log(`listening on port ${process.env.PORT}`)
})
