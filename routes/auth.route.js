const express = require('express');
const {login, register} = require('../controllers/auth/authController.js');
const { body, query } = require('express-validator');

const router = express.Router();

router.post('/login', body('email').isEmail(), body('password').isLength({min:5}), login);

router.post('/register',
    body('first_name').isLength({min:3}),
    body('last_name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
register);

module.exports = router;