//API Routes for trips CRUD calls
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
const bodyParser = require('body-parser');

//Create a trip
router.post("/", async(req,res) => {
    try {
        const {trip_name, trip_origin, trip_return, trip_description, trip_type, trip_start_date, trip_end_date}  = req.body;
        const newTrip = await pool.query("INSERT INTO trips (trip_name, trip_origin, trip_return, trip_description, trip_type, trip_start_date, trip_end_date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [trip_name, trip_origin, trip_return, trip_description, trip_type, trip_start_date, trip_end_date]);
        res.json(newTrip.rows[0])
    } catch (err) {
            console.error(err.message);
        }
});

//Get all trips
router.get("/", async(req,res) => {
    try {
        const allTrips = await pool.query("SELECT * FROM trips");
        res.json(allTrips.rows);
    } catch (err) {
            console.error(err.message);
        }
});

//Delete a trip by ID
router.delete("/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        const deletedTrip = await pool.query("DELETE FROM trips WHERE trip_id = $1", [id])
        console.log(`Trip ID: ${id} has been deleted.`);
        res.json(`Trip ID: ${id} has been deleted.`);
    } catch (err) {
        console.error(err.message);
    }
});


module.exports = router;