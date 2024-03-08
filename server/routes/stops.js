//API Routes for Stops CRUD calls
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
// const bodyParser = require('body-parser');


//Get all Stops for a certain Trip
router.get("/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const allStops = await pool.query("SELECT * FROM stops WHERE trip_id = $1", [id]);
        res.json(allStops.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// router.delete("/:id", async(req,res) => {
//     try {
//         const id = parseInt(req.params.id);
//         console.log(id);
//         const deletedTrip = await pool.query("DELETE FROM trips WHERE trip_id = $1", [id])
//         console.log(`Trip ID: ${id} has been deleted.`);
//         res.json(`Trip ID: ${id} has been deleted.`);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

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
        const {trip_id, stop_name, stop_location, stop_order, stop_first_day, stop_last_day} = req.body;
        const newStop = await pool.query("INSERT into stops (trip_id, stop_name, stop_location, stop_order, stop_first_day, stop_last_day) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [trip_id, stop_name, stop_location, stop_order, stop_first_day, stop_last_day]);
        res.json(newStop.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

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

module.exports = router;