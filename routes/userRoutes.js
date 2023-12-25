const express = require('express');
const {
  authUser,
  registerUser,
  logoutUser,
  authAdmin,
  registerAdmin,
  getUsers
} = require('../controllers/userController.js');

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/auth/admin', authAdmin);
router.post('/admin', registerAdmin);
router.get('/get',getUsers);

module.exports = router