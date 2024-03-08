//API Routes for Days CRUD calls
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
const bodyParser = require('body-parser');

//Get all days that belong to a trip's stop
router.get("/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const allDays = await pool.query("SELECT * FROM days WHERE stop_id = $1", [id]);
        res.json(allDays.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Add a day to a trip's stop
router.post("/", async(req,res) => {
    try {
        const {stop_id, accommodation_id, day_person_count, day_activity_count, day_name} = req.body;
        const newDay = await pool.query("INSERT INTO days (stop_id, accommodation_id, day_person_count, day_activity_count, day_name) VALUES($1, $2, $3, $4, $5) RETURNING *", [stop_id, accommodation_id, day_person_count, day_activity_count, day_name]);
        res.json(newDay.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a day from a stop
router.delete("/delete/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedDay = await pool.query("DELETE FROM days WHERE day_id = $1", [id]);
        console.log(`Day ID: ${id} has been deleted.`);
        res.json(`Day ID: ${id} has been deleted.`);
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;