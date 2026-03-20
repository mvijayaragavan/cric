const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    playerId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    jerseyNumber: {
        type: String
    },
    role: {
        type: String,
        enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'],
        default: 'Batsman'
    },
    battingStyle: {
        type: String,
        default: 'Right-hand bat'
    },
    bowlingStyle: {
        type: String,
        default: 'Right-arm medium'
    },
    careerStats: {
        matches: { type: Number, default: 0 },
        runs: { type: Number, default: 0 },
        ballsFaced: { type: Number, default: 0 },
        strikeRate: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        centuries: { type: Number, default: 0 },
        fifties: { type: Number, default: 0 },
        highestScore: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        oversBowled: { type: Number, default: 0 },
        runsConceded: { type: Number, default: 0 },
        economy: { type: Number, default: 0 },
        bestBowling: {
            wickets: { type: Number, default: 0 },
            runs: { type: Number, default: 0 }
        }
    },
    recentMatches: [{
        matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
        opponent: String,
        runs: Number,
        balls: Number,
        wickets: Number,
        runsConceded: Number,
        overs: Number,
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Player', PlayerSchema);
