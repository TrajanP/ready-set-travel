const allowedOrigins = require('./allowedOrigins');

const corsOption = {
    origin: (origin, callback) => { //Origin is who requested the resource
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) //Is the origin in the whitelist?
            callback(null, true);
        else 
            callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200
}

module.exports = corsOption;