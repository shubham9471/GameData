const mongoose = require('mongoose');

// Have taken the playerStatistics similar to cricket

const gameSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  playerStatistics: {
    totalGamesPlayed: { 
        type: Number, 
        default: 0 
    },
    totalWins: { 
        type: Number,
         default: 0 
    },
    totalLosses: {
        type: Number,
        default: 0 
    },
    totalScore: { 
        type: Number,
        default: 0 
    },
    highestScore: { 
        type: Number, 
        default: 0 
    },
    averageScore: { 
        type: Number, 
        default: 0 
    }
  },
  gameResults: {
    games: [
      {
        gameID: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
        datePlayed: { 
            type: Date, 
            default: new Date()
        },
        outcome: { 
            type: String,
            enum: ["WIN", "LOSS", "DRAW", "NORESULT"]
         }, // 'win', 'loss', 'draw', "no result" As of now have taken only 4 possibilities 
        
      },
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);;
