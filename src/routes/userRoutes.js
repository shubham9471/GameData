
const express = require('express');
const userController = require('../controllers/userController')
const app = express();
const router = express.Router();

//Registeration API For USER
app.post('/register', userController.createUser)

//Login API For USER
app.post('/login', userController.loginUser)

module.exports = router;