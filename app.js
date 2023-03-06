const express = require('express')
const { dbConnection } = require('./src/database/dbConnection')
require("dotenv").config({path:"./config/.env"})
const app = express()
const port = process.env.PORT
const morgan =require("morgan")

app.use(express.json())
app.use(morgan("dev"))
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))