const Game = require('../Models/gameDataSchema');
//----------------------------------------------Validation functions ------------------------------------------------------------------


const isValidRequestBody = function (requestBody) {
    if (!(requestBody.hasOwnProperty('userName'))){
        return ('UserName is required', false)
    }else{
        if (requestBody.userName === null){
            return ('Username is required', false)
        }
    }
    return true
}


// Create a new game entry
const createGameData =async (req, res) => {
    try {
        if (!(isValidRequestBody(req.body))){
            return res.status(400).send({message: 'UserName is not valid/not present'});
        } 
    
        // To check if username is present in sqp DB or not 
        try {
                // Check if the username exists or not
                const existingUser = await db.query('SELECT * FROM users WHERE username = ?', [req.body.userName]);
            
                if (existingUser.length === 0) {
                return res.status(400).json({ error: 'Incorrect Username' });
                } else{
                    return cb()
                }
        } catch (err){
            console.log("Error in checking for an existing user", err);
        }

        // To check if duplicate entry is not being created from the same username in MONGODB
        try {
             // Check if the username exists or not
             const existingUser = await Game.find({'userName': req.body.userName});
            
             if (existingUser.length > 0) {
                return res.status(400).json({ message: 'UserName already exists' });
             }
    
        } catch (err){
            console.log("Error in checking for an existing user", err);
        }
        let userName = req.body.userName.toLowerCase()
      
        
        const { playerStatistics, games } = req.body;
    
        let gameResults = {
            games: games
        }
        const game = new Game({ userName, playerStatistics, gameResults });
        try {
            await game.save();
            res.status(201).json({ message: 'Game created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create game', error });
        }
        

   } catch (err){
       console.log("Error while creating user", err);
   }
    
};

// Retrieve game data for a specific user
const getGameData = async (req, res) => {
  const userName  = req.params.userName.toLowerCase();
  console.log("USername==>", req.params.userName)

  try {
    const userGames = await Game.find({ userName });
    if (userGames.length > 0){
        res.json({ gameData: userGames });
    }else{
        res.status(404).json({ message: 'No games found for this userName'})
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve game data' });
  }
};

// Update game data for a specific user
const updateGameData = async (req, res) => {
    try {
        
        const userName = req.params.userName.toLowerCase();
        const updatedGameData = req.body;
        // Check if the username exists or not
        try {
            
            const user = await Game.find({userName});
            if (user.length === 0) {
               return res.status(400).json({ message: 'UserName does not exists' });
            }
   
       } catch (err){
           console.log("Error in checking for an existing user", err);
       }
    
        // check if userName is being updated , throw an error
        if (updatedGameData.hasOwnProperty('userName')){
            return res.status(400).json({message:'UserName cannot be updated from here'})
        }
    
        try {
            await Game.updateOne({ userName }, { $set: updatedGameData });
            res.json({ message: 'Game data updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update game data', error });
        }
        
    
        } catch (error){
        console.log("Error while updating an existing user", error);
    }
    
};

// Delete a game entry
const deleteGameData =  async (req, res) => {
    try {
            const userName = req.params.userName.toLowerCase();
            // Check if the username exists or not
            try {
                const user = await Game.find({userName});
                if (user.length === 0) {
                return res.status(400).json({ message: 'UserName does not exists' });
                }
    
            } catch (err){
                console.log("Error in checking for an existing user", err);
            }

        // DELETE THE USER

            try {
                await Game.deleteOne({ userName });
                res.json({ message: 'Game data deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Failed to delete game data', error });
            }
        
      } catch (error) {
        res.status(500).json({ message: 'Error while deleting User gameData', error });
      }
    
};

module.exports.createGameData = createGameData
module.exports.getGameData = getGameData
module.exports.updateGameData = updateGameData
module.exports.deleteGameData = deleteGameData
