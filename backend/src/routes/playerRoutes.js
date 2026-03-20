const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.post('/', playerController.createPlayer);
router.get('/', playerController.getPlayers);
router.get('/:id', playerController.getPlayerById);

module.exports = router;
