//API Routes for users CRUD calls
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

//Get a user
router.get("/:id", async(req,res) => {
    const user_username = req.params.id;
    try {
        const user = await pool.query("SELECT * from users WHERE user_username = $1", [user_username]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//Update a User's First Name
router.patch("/update/fName", async(req,res) => {
    try {
        const { user_username, user_first_name } = req.body;
        const updatedUser = await pool.query("UPDATE users SET user_first_name = $1 WHERE user_username = $2 RETURNING *", [user_first_name, user_username]);
        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a User's Last Name
router.patch("/update/lName", async(req,res) => {
    try {
        const { user_username, user_last_name } = req.body;
        const updatedUser = await pool.query("UPDATE users SET user_last_name = $1 WHERE user_username = $2 RETURNING *", [user_last_name, user_username]);
        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a User's Username 
router.patch("/update/username", async(req,res) => {

    const { user_username, user_new_username } = req.body; 
    const existingUserName = await pool.query("SELECT * from users WHERE user_username = $1", [user_new_username]);

    if (existingUserName.rows.length !== 0)
        return res.status(400).json({ success: false, msg: "Username already exists."});

    try {
        const updatedUser = await pool.query("UPDATE users SET user_username = $1 WHERE user_username = $2 RETURNING *", [user_new_username, user_username]);
        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a User's Password
router.patch("/update/pass", async(req,res) => {
    const { user_username, user_password } = req.body;
    const userExists = await pool.query("SELECT * from users WHERE user_username = $1", [user_username]);
    if(userExists.rows.length === 0)
        return res.status(400).json({ success: false, msg: "User does not exist or invalid token."});
    try {
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const updatedPass = await pool.query("UPDATE users SET user_password = $1 WHERE user_username = $2 RETURNING *", [hashedPassword, user_username]);
        res.json(updatedPass.rows[0]);
    } catch (err) {
        console.error(err.message);
    }

})
module.exports = router;