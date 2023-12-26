const express = require('express');
const {
  addCard,
  getCard
} = require('../controllers/cardController');

const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.fields([
    { name: 'front' },
    { name: 'image' },
    { name: 'envelope' },
    { name: 'custom' }
  ]), addCard);
router.get('/get', getCard);

module.exports = router