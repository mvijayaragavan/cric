const Club = require('../models/Club');

// Create a new club
exports.createClub = async (req, res) => {
    try {
        const { name, description, foundedYear, location } = req.body;
        const newClub = new Club({
            name,
            description,
            foundedYear,
            location
        });

        const savedClub = await newClub.save();
        res.status(201).json(savedClub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all clubs
exports.getClubs = async (req, res) => {
    try {
        const clubs = await Club.find();
        res.status(200).json(clubs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single club
exports.getClub = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id)
            .populate('teams')
            .populate('tournaments');
        if (!club) return res.status(404).json({ error: 'Club not found' });
        res.status(200).json(club);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update club
exports.updateClub = async (req, res) => {
    try {
        const updatedClub = await Club.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedClub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete club
exports.deleteClub = async (req, res) => {
    try {
        await Club.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Club deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
