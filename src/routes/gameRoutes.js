const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController')
const mid =require('../middleware/tokenAuth')
const app = express()
// app.get('/abc',mid.middleware, gameController.getGameData)
app.get('/abc', () => {
    console.log("HELLO WORLD ABC")
})
//Create USER stats
app.post('game/create/:username',mid.middleware, gameController.createGameData)

//Get USER stats

app.get('/get/:username',mid.middleware, gameController.getGameData)



//Update USER stats
app.put('game/update/:username', mid.middleware, gameController.updateGameData)

//Delete USER stats
app.delete('game/delete/:username', mid.middleware, gameController.deleteGameData)

module.exports = router