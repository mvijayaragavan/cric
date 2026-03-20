const Tournament = require('../models/Tournament');

exports.createTournament = async (req, res) => {
    try {
        const tournament = new Tournament(req.body);
        await tournament.save();
        res.status(201).json(tournament);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('teams.teamId');
        res.json(tournaments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addTeamToTournament = async (req, res) => {
    try {
        const { teamId, name } = req.body;
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) return res.status(404).json({ message: 'Tournament not found' });

        tournament.teams.push({ teamId, name });
        await tournament.save();
        res.json(tournament);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
