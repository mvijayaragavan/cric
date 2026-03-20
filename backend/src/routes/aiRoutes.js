const express = require('express');
const router = express.Router();
const multer = require('multer');
const { parseReport } = require('../controllers/aiController');

// Use memory storage since we just need to pass the base64 to Gemini
const upload = multer({ storage: multer.memoryStorage() });

router.post('/parse-report', upload.single('reportImage'), parseReport);

module.exports = router;
