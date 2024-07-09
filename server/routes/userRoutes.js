// routes/userRoute.js
const express = require('express');
const router = express.Router();
const { loginController, registerController, getUserBalance, getAllUsers } = require('../controllers/userController');

// POST || Login
router.post('/login', loginController);

// POST || Register
router.post('/register', registerController);

// GET || Get Balance
router.post('/get-balance', getUserBalance);



module.exports = router;