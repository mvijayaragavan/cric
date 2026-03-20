const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    shortName: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: ''
    },
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    viceCaptain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    teamManager: String,
    teamColor: {
        type: String,
        default: '#47adb8'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);
