// const allowedOrigins = require('../../src/apis/config/allowedOrigins');
const allowedOrigins = require('../config/allowedOrigins');
//If origin of sent request is allowed, set this header configuration
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials; 