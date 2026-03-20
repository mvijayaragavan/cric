const express = require('express');
const router = express.Router();
const {
    createClub,
    getClubs,
    getClub,
    updateClub,
    deleteClub
} = require('../controllers/clubController');

router.post('/', createClub);
router.get('/', getClubs);
router.get('/:id', getClub);
router.put('/:id', updateClub);
router.delete('/:id', deleteClub);

module.exports = router;
