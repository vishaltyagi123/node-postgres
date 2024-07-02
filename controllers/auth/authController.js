const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult } = require('express-validator');
const {JWT_SECRET} = require('../../utils/utils.config.js');
const connectionPool = require('../../utils/utils.db.js');
const {errorHandler} = require('../../utils/utils.errorHandler.js');

const login = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(403).json({errors: result.array()});
    }

    const {email, password} = req.body;
    connectionPool.query('SELECT id,email,password from account WHERE email = $1', [email], (err, data) => {
    if (err) return next(errorHandler("404", err.detail ? err.detail : "Somwthing Went Wromg"));
        if (!data.rows[0].email) return next(errorHandler(404, "User Not Found."));
        //validate Password
        const isVaildPAssword = bcrypt.compareSync(password, data.rows[0].password);
        if (!isVaildPAssword) return next(errorHandler(400, "Wrong Credentials"));

        // for set manually one email as admin for authorization
        const role = (data.rows[0].email == "vishal@gmail.com") ? "ADMIN" : "USER";

        const token = jwt.sign({
            userId:data.rows[0].id,
            email:data.rows[0].email,
            role:role,
            }, JWT_SECRET,{expiresIn: "365d"}
        );
        res.status(201).json({access_token: `Bearer ${token}`});
    });
}

const register = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(403).json({errors: result.array()});
    }

    const { first_name, last_name, email, password, phone, birthday} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    connectionPool.query('INSERT INTO account (first_name, last_name, email, password, phone, birthday) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [first_name, last_name, email, hashPassword, phone, birthday], (err, result) => {
    if (err) return next(errorHandler(208, err.detail ? err.detail : "Somwthing Went Wromg"));
        const {password,id, birthday,created_at,last_modified, ...rest} = result.rows[0];
        res.status(201).json(rest);
    });
}

module.exports = {
    login,
    register
}


