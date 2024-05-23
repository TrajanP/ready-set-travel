//API Routes for logout feature
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");

//Log Out - Retrieve cookies, remove refresh token in the user cookie and database
router.get("/", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) //No cookie or JWT present
    {
        return res.sendStatus(204).json({ success: false, msg: "No Cookie or JWT present"}); //No content
    }
    const refreshToken = cookies.jwt;
    //Is refresh token in db?
    const foundUser = await pool.query("SELECT * from users WHERE user_refresh_token = $1", [refreshToken]);
    //Did not find user
    if(foundUser.rows.length === 0)
    {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });  
        return res.sendStatus(204).json({ success: false, msg: "JWT did not match with user"});
    }
    //Found the user, remove refresh token inside database and cookie
    const updatedUser = await pool.query("UPDATE users SET user_refresh_token = $1 WHERE user_username = $2", [null, foundUser.rows[0].user_username]);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); 
    res.sendStatus(204);
});

module.exports = router;