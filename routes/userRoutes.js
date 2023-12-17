const express = require('express');
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController.js');

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);


module.exports = router