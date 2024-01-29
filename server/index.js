const express = require("express"); //Define our express library
const cors = require("cors"); //Define out cors library
const app = express(); //Create variable app which takes library and runs it
const bodyParser = require('body-parser');
require('dotenv').config();
console.log(process.env)
//const pool = require("./routes/"); //Defines our connection and credentials to run queries

//Middleware, Gaining access to client side data
app.use(cors());
app.use(bodyParser.json()) //For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.json); //THIS IS BREAKING CONNECTION TO PORT 5000 This allows out middleware to get access to the Request.Body, which provides JSON data
  
//Register API Routes
app.use("/trips", require("./routes/trips"));

//Start server 
app.listen(5000, () => { 
    console.log("server has started on port 5000");
});