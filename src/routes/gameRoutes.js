const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController')
// const mid = require('../middleware/tokenAuth')


router.get('/test-me',(req,res) => {
    res.send('Welcome to gaming route ...')
})

//Create USER stats
router.post('/create', gameController.createGameData)

//Get USER stat
router.get('/get/:userName', gameController.getGameData)

//Update USER stats
router.put('/update/:userName',  gameController.updateGameData)

//Delete USER stats
router.delete('/delete/:userName', gameController.deleteGameData)


module.exports = router;