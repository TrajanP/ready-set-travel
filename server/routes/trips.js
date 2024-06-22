//API Routes for trips CRUD calls
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
const bodyParser = require('body-parser');

//Create a trip
router.post("/", async(req,res) => {
    try {
        const {trip_name, trip_user_id, trip_description, trip_type, trip_start_date, trip_end_date, trip_created_date}  = req.body;
        const newTrip = await pool.query("INSERT INTO trips (trip_name, trip_user_id, trip_description, trip_type, trip_start_date, trip_end_date, trip_created_date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [trip_name, trip_user_id, trip_description, trip_type, trip_start_date, trip_end_date, trip_created_date]);
        res.json(newTrip.rows[0])
    } catch (err) {
            console.error(err.message);
        }
})

//Get all trips
router.get("/", async(req,res) => {
    try {
        const allTrips = await pool.query("SELECT * FROM trips");
        res.json(allTrips.rows);
    } catch (err) {
            console.error(err.message);
        }
})


//Delete a trip by ID
router.delete("/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedTrip = await pool.query("DELETE FROM trips WHERE trip_id = $1", [id]);
        console.log(`Trip ID: ${id} has been deleted.`);
        res.json(`Trip ID: ${id} has been deleted.`);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a singular trip
router.get("/mytrip/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const myTrip = await pool.query("SELECT * FROM trips WHERE trip_id = $1", [id]);
        console.log(`Trip ID: ${id} has been selected`);
        res.json(myTrip.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get all trips for a specific user
router.get("/mytrips/:id", async(req,res) => {
    try {
        const userID = parseInt(req.params.id);
        const userTrips = await pool.query("SELECT * from trips WHERE trip_user_id = $1", [userID]);
        console.log(`User ${userID}'s trips have been retrieved`);
        res.json(userTrips.rows);
    } catch (err) {
        console.error(err.nessage);
    }
})

module.exports = router;