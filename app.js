const express = require('express')
const { dbConnection } = require('./src/database/dbConnection')
require("dotenv").config({path:"./config/.env"})
const app = express()
const port = process.env.PORT
const morgan =require("morgan")
const AppErr = require('./src/utils/AppErr')

app.use(express.json())
app.use(morgan("dev"))
app.all('*',(req,res,next)=>{
    next(new AppErr(`can't find this route: ${req.originalUrl} on server`,404))
})
app.use()
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
