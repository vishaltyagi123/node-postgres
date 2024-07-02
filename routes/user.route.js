const express = require('express');
const {
    getUsers,
    updateUser,
    deleteUser
} = require('../controllers/userController.js');
const {authMiddleware} = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/getUsers', getUsers);
router.put('/updateUser/:id', authMiddleware, updateUser);
router.post('/deleteUser', authMiddleware, deleteUser);

module.exports = router;