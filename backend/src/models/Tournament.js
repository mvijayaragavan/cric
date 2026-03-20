const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    format: {
        type: String,
        enum: ['T20', 'ODI', 'Test', 'Custom'],
        default: 'T20'
    },
    matchType: {
        type: String,
        enum: ['League', 'Knockout', 'League + Knockout'],
        default: 'League'
    },
    organizerName: String,
    logo: String,
    startDate: Date,
    endDate: Date,
    location: String,
    totalTeams: Number,
    teams: [{
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        name: String,
        matchesPlayed: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        points: { type: Number, default: 0 },
        nrr: { type: Number, default: 0 }
    }],
    rules: {
        oversPerBowler: { type: Number, default: 4 },
        powerplayOvers: { type: Number, default: 6 }
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed'],
        default: 'Upcoming'
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
