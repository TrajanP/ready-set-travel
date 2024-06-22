//API Routes for Stops CRUD calls
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
// const bodyParser = require('body-parser');


//Get all Stops for a certain Trip by ascending order
router.get("/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const allStops = await pool.query("SELECT * FROM stops WHERE trip_id = $1 ORDER BY stop_order ASC", [id]);
        res.json(allStops.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Stops
router.get("/", async(req,res) => {
    try {
        const allStops = await pool.query("SELECT * FROM stops");
        res.json(allStops.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Add a Stop for a certain Trip
router.post("/", async(req,res) => {
    try {
        const { trip_id, stop_name, stop_location, stop_order, stop_first_day, stop_last_day, stop_long, stop_lat } = req.body;
        const newStop = await pool.query("INSERT into stops (trip_id, stop_name, stop_location, stop_order, stop_first_day, stop_last_day, stop_long, stop_lat) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [trip_id, stop_name, stop_location, stop_order, stop_first_day, stop_last_day, stop_long, stop_lat]);
        res.json(newStop.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Delete a specific Stop from a Trip
router.delete("/delete/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedTrip = await pool.query("DELETE FROM stops WHERE stop_id = $1", [id]);
        console.log(`Stop ID: ${id} has been deleted.`);
        res.json(`Trip ID: ${id} has been deleted`);
    }   catch (err) {
            console.error(err.message);
    }
});

//Update a Stops's Order in an itinerary after user changes
router.patch("/update/order", async(req,res) => {
    try {
        const { stop_id, stop_order } = req.body;
        const updatedStop = await pool.query("UPDATE stops SET stop_order = $1 WHERE stop_id = $2 RETURNING *", [stop_order, stop_id]);
        res.json(updatedStop.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;
