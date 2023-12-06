const express = require('express');
const Game = require('../Models/gameDataSchema');

//----------------------------------------------Validation functions ------------------------------------------------------------------


const isValidRequestBody = function (requestBody) {
    if (!(requestBody.hasOwnProperty('username'))){
        return ('Username is required', false)
    }else{
        if (requestBody.username === null){
            return ('Username is required', false)
        }
    }
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

// Create a new game entry
const createGameData =async (req, res) => {
    if (!(isValidRequestBody(req.body))){
        return res.status(400).send({message: 'Username is not valid'});
    }
    try {
         // Check if the username exists or not
         const existingUser = await db.query('SELECT * FROM users WHERE username = ?', [req.body.username]);

         if (existingUser.length < 0) {
            return res.status(400).json({ error: 'Incorrect Username' });
         }

    } catch (err){
        console.log("Error in checking for an existing user", err);
    }
    // check the other fields
   
    const { username, playerStatistics, gameResults } = req.body;

    if (gameResults &&  gameResults.games.length>0){
        arr = gameResults.games
        for (let i = 0; i< arr.length; i++){
            if (!(isValidObjectId(arr.gameID))){
                return res.status(400).send({ status: false, msg: "gameID is not valid" })
            }

        }
    }
    const game = new Game({ username, playerStatistics, gameResults });

    try {
        await game.save();
        res.status(201).json({ message: 'Game created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create game' });
    }
};

// Retrieve game data for a specific user
const getGameData = async (req, res) => {
  const { username } = req.params;

  try {
    const userGames = await Game.find({ username });
    res.json({ gameData: userGames });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve game data' });
  }
};

// Update game data for a specific user
const updateGameData = async (req, res) => {
    if (!(isValidRequestBody(req.body))){
        return res.status(400).send({message: 'Username is not valid'});
    }
    try {
         // Check if the username exists or not
         const existingUser = await db.query('SELECT * FROM users WHERE username = ?', [req.body.username]);

         if (existingUser.length < 0) {
            return res.status(400).json({ error: 'Incorrect Username' });
         }

    } catch (err){
        console.log("Error in checking for an existing user", err);
    }
    const { username } = req.params;
    const updatedGameData = req.body;

    try {
        await Game.updateOne({ username }, { $set: updatedGameData });
        res.json({ message: 'Game data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update game data', error });
    }
};

// Delete a game entry
const deleteGameData =  async (req, res) => {
  const { username } = req.params;

  try {
    await Game.deleteOne({ username });
    res.json({ message: 'Game data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete game data', error });
  }
};

module.exports.createGameData = createGameData
module.exports.getGameData = getGameData
module.exports.updateGameData = updateGameData
module.exports.deleteGameData = deleteGameData
