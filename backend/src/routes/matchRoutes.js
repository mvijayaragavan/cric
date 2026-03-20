const express = require('express');
const router = express.Router();
const {
    createMatch,
    getMatches,
    getMatch,
    updateScore,
    undoScore
} = require('../controllers/matchController');

router.post('/', createMatch);
router.get('/', getMatches);
router.get('/:id', getMatch);
router.post('/:id/score', updateScore);
router.post('/:id/undo', undoScore);

module.exports = router;
