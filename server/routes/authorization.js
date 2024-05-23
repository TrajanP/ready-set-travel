//API Routes for User CRUD calls
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//SIGNUP - Create a new User
router.post("/", async(req,res) => {
    const { username, firstName, lastName, password } = req.body;

    //If Username or Password is empty
    if (!username || !password) 
        return res.status(400).json({ 'message': `Username ${username}  and Password  ${password} is required.`});
    //If first or last name is empty
    if (!firstName || !lastName)
        return res.status(400).json({ 'message': 'First Name and Last Name is required'});
    //Check for duplicate
    const existingUser = await pool.query("SELECT * from users WHERE user_username = $1", [username]);

    if (existingUser.rows.length !== 0)
        return es.status(401).json({ success: false, msg: "Username already exists."});

    try {
        //Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Store the new user
        const newUser = await pool.query("INSERT into users (user_username, user_first_name, user_last_name, user_password) VALUES($1, $2, $3, $4) RETURNING *", [username, firstName, lastName, hashedPassword]);
        return res.json(newUser.rows[0]);
    } catch (err) {
        return res.status(500).json({ 'message': err.message }); 
    }
});

//LOGIN - Validate User's login credentials and return token
router.post("/login/", async(req,res) => {
    const { username, password } = req.body;

    //If Username or Password is empty
    if (!username || !password) 
        return res.status(400).json({ 'message': `Username ${username}  and Password  ${password} is required.`});
    
    //If User doesn't exist
    const foundUser = await pool.query("SELECT * from users WHERE user_username = $1", [username]);
    if(foundUser.rows.length === 0)
        return res.status(401).json({ 'message': 'Not authorized' });
    
    //Need to evaluate password for provided username
    //return res.status(400).json({ 'message': `Username ${process.env.ACCESS_TOKEN_SECRET}  and Password  ${foundUser.rows[0].user_password} is required.`});
    const match = await bcrypt.compare(password, foundUser.rows[0].user_password);
    if(match)
    {
        const accessToken = jwt.sign(
            { username: foundUser.rows[0].user_username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20m' }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.rows[0].user_username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '60m' }
        );
        const refresh = await pool.query("UPDATE users SET user_refresh_token = $1 WHERE user_username = $2", [refreshToken, foundUser.rows[0].user_username]); //Store refresh token in user DB, so that we can retriece it when we need to refresh
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true }); //Set refresh token cookie for user
        const name = foundUser.rows[0].user_first_name;
        const userID = foundUser.rows[0].user_id;
        res.json({ accessToken, name, userID });
    }
    else 
        res.sendStatus(401);
});

module.exports = router;