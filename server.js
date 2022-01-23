
const express = require('express');
const bodyparser=require("body-parser");
const dotenv= require("dotenv");
const morgan= require("morgan");
const path=require("path");

const connectDB= require("./server/database/connection")

const app = express();


dotenv.config({path:"config.env"})

const PORT= process.env.PORT || 8080

//log requests
app.use(morgan("tiny"))

connectDB();

//parse request to bosy-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")

//load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/css")))
app.use("/img",express.static(path.resolve(__dirname,"assets/img")))
app.use("/js",express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/', require('./server/routes/router'))

    
app.listen(PORT,function(){
    console.log("Running on http://localhost:%d",PORT)
})


