//API Routes for JWT Refresh feature
//NOT Currently used
const express = require('express');
const router = express.Router();
const pool = require("../db/db.js");
const jwt = require('jsonwebtoken');

router.post("/", async(req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) 
        return sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = pool.query("SELECT * from users WHERE user_refresh_token = $1", [refreshToken]);
    if(foundUser.rows.length === 0)
        return res.sendStatus(403).json({ 'message': 'No Refresh Token' });
    //Evaluate JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, 
        router.post("/", async(req,res) => {
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username) 
                    return res.sendStatus(403).json({ 'message': 'Invalid Refresh Token' });
                const accessToken = jwt.sign (
                    { username: decoded.user_username},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10m'}
                );
                res.json({ accessToken });
            }
        })
    )
});

module.exports = router;