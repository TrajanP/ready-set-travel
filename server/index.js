require('dotenv').config({path: '../.env'});
const express = require("express"); //Define our express library
const cors = require("cors"); //Define out cors library
const credentials = require('../server/middleware/credentials');
const corsOptions = require('../src/apis/config/corsOptions');
const app = express(); //Create variable app which takes library and runs it
const bodyParser = require('body-parser');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


console.log(process.env);

//const pool = require("./routes/"); //Defines our connection and credentials to run queries

//Middleware, Gaining access to client side data
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json()); //For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.json); //THIS IS BREAKING CONNECTION TO PORT 5000 This allows out middleware to get access to the Request.Body, which provides JSON data
  

//Non Verified API Routes
app.use("/authorization", require("./routes/authorization"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//Verified API Routes
app.use(verifyJWT);
app.use("/stops", require("./routes/stops"));
app.use("/trips", require("./routes/trips"));
app.use("/days", require("./routes/days"));
app.use("/users", require("./routes/users"));


//Start server 
app.listen(5000, () => { 
    console.log("server has started on port 5000");
});