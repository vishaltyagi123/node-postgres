const jwt = require('jsonwebtoken')
const {JWT_SECRET}  = require('../utils/utils.config.js');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader === undefined || authHeader === null) return res.status(401).json({"messge": "Unauthorised!"});
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err) return res.status(401).json({"messge": "Unauthorised!"});
        req.user = payload;
        next();
    });
}

module.exports = {authMiddleware};