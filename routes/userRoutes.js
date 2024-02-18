const express = require('express');
const {
  authUser,
  registerUser,
  logoutUser,
  authAdmin,
  registerAdmin,
  getUsers,
  passwordResetRequest,
  resetPassword,
  deleteUser,
  deleteReceiver,
  updateProfile,
  updatePassword
} = require('../controllers/userController.js');

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/auth/admin', authAdmin);
router.post('/admin', registerAdmin);
router.get('/get',getUsers);
router.post('/reset/password/request',passwordResetRequest)
router.post('/reset/password/:token',resetPassword)
router.post('/delete/user',deleteUser)
router.post('/delete/receiver',deleteReceiver)
router.post('/update/profile',updateProfile)
router.post('/update/password',updatePassword)

module.exports = router