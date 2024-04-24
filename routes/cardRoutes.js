const express = require('express');
const {
  addCard,
  getCard,
  deleteCard,
  getSpecificCard,
  updateCard
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
router.post('/del',deleteCard)
router.post('/specific',getSpecificCard)
router.post('/update', upload.fields([
  { name: 'front' },
  { name: 'image' },
  { name: 'envelope' },
  { name: 'custom' }
]), updateCard);

module.exports = router