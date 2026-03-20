const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');

router.post('/', tournamentController.createTournament);
router.get('/', tournamentController.getTournaments);
router.post('/:id/teams', tournamentController.addTeamToTournament);

module.exports = router;
