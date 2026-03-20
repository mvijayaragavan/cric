const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
    try {
        const { name, shortName, logo } = req.body;
        const team = new Team({ name, shortName, logo });
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
