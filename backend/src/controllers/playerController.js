const Player = require('../models/Player');

// Create a new player
exports.createPlayer = async (req, res) => {
    try {
        const { name, jerseyNumber, role, battingStyle, bowlingStyle } = req.body;

        // Generate a unique Player ID
        const count = await Player.countDocuments();
        const playerId = `ST-${1000 + count + 1}`;

        const player = new Player({
            playerId,
            name,
            jerseyNumber,
            role,
            battingStyle,
            bowlingStyle
        });

        await player.save();
        res.status(201).json(player);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all players
exports.getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findOne({ playerId: req.params.id });
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
