const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: true
    },
    team2: {
        type: String,
        required: true
    },
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    team1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    team2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    tossWinner: {
        type: String
    },
    tossDecision: {
        type: String,
        enum: ['bat', 'bowl']
    },
    battingTeam: {
        type: String
    },
    bowlingTeam: {
        type: String
    },
    totalOvers: {
        type: Number,
        required: true,
        default: 20
    },
    status: {
        type: String,
        enum: ['scheduled', 'ongoing', 'completed'],
        default: 'scheduled'
    },
    score: {
        team1: {
            runs: { type: Number, default: 0 },
            wickets: { type: Number, default: 0 },
            overs: { type: Number, default: 0 },
            balls: { type: Number, default: 0 }
        },
        team2: {
            runs: { type: Number, default: 0 },
            wickets: { type: Number, default: 0 },
            overs: { type: Number, default: 0 },
            balls: { type: Number, default: 0 }
        }
    },
    currentInnings: {
        type: Number,
        default: 1
    },
    events: [{
        type: mongoose.Schema.Types.Mixed
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Match', MatchSchema);
