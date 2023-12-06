const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController')
const mid =require('../middleware/tokenAuth')
const app = express()
//Create USER stats
app.post('/game/create/:username',mid.middleware, gameController.createGameData)

//Get USER stats
app.post('/game/get/:username',mid.middleware, gameController.getGameData)

//Update USER stats
app.post('/game/update/:username', mid.middleware, gameController.updateGameData)

//Delete USER stats
app.post('/game/delete/:username', mid.middleware, gameController.deleteGameData)

module.exports = router