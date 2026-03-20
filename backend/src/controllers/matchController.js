const Match = require('../models/Match');

// Initialize a new match
exports.createMatch = async (req, res) => {
    try {
        const { team1, team2, totalOvers } = req.body;
        const match = new Match({
            team1,
            team2,
            totalOvers: totalOvers || 20,
            battingTeam: team1,
            bowlingTeam: team2,
            status: 'ongoing'
        });
        const savedMatch = await match.save();
        res.status(201).json(savedMatch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all matches
exports.getMatches = async (req, res) => {
    try {
        const matches = await Match.find().sort({ createdAt: -1 });
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single match
exports.getMatch = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ error: 'Match not found' });
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Score (Unified Event System)
exports.updateScore = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, val, striker } = req.body;

        const match = await Match.findById(id);
        if (!match) return res.status(404).json({ error: 'Match not found' });

        const battingTeamKey = match.currentInnings === 1 ? 'team1' : 'team2';
        const teamScore = match.score[battingTeamKey];

        const event = {
            type,
            val,
            striker,
            timestamp: new Date(),
            overs: teamScore.overs,
            balls: teamScore.balls
        };

        if (type === 'RUNS') {
            teamScore.runs += val;
            teamScore.balls += 1;
        } else if (type === 'EXTRA') {
            teamScore.runs += 1; // Assuming 1 run for extras in this league
            if (val === 'lb' || val === 'b') {
                teamScore.balls += 1;
            }
            // wd/nb don't add to legal balls
        } else if (type === 'WICKET') {
            teamScore.wickets += 1;
            teamScore.balls += 1;
        }

        // Over completion detection
        if (teamScore.balls === 6) {
            teamScore.overs += 1;
            teamScore.balls = 0;
        }

        match.events.push(event);
        const updatedMatch = await match.save();

        if (req.io) {
            req.io.to(id).emit('score_update', updatedMatch);
        }

        res.status(200).json(updatedMatch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Undo Last Score Event
exports.undoScore = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);
        if (!match || match.events.length === 0) {
            return res.status(400).json({ error: 'No events to undo' });
        }

        const lastEvent = match.events.pop();
        const battingTeamKey = match.currentInnings === 1 ? 'team1' : 'team2';
        const teamScore = match.score[battingTeamKey];

        // Reverse the logic
        if (lastEvent.type === 'RUNS') {
            teamScore.runs -= lastEvent.val;
            teamScore.balls -= 1;
        } else if (lastEvent.type === 'EXTRA') {
            teamScore.runs -= 1;
            if (lastEvent.val === 'lb' || lastEvent.val === 'b') {
                teamScore.balls -= 1;
            }
        } else if (lastEvent.type === 'WICKET') {
            teamScore.wickets -= 1;
            teamScore.balls -= 1;
        }

        // Correct negative balls/overs
        if (teamScore.balls < 0) {
            teamScore.overs -= 1;
            teamScore.balls = 5;
        }

        const updatedMatch = await match.save();

        if (req.io) {
            req.io.to(id).emit('score_update', updatedMatch);
        }

        res.status(200).json(updatedMatch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
