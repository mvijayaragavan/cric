const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    logo: String,
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    tournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    }],
    foundedYear: Number,
    location: String
}, { timestamps: true });

module.exports = mongoose.model('Club', ClubSchema);
