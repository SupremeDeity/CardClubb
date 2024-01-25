const asyncHandler = require('express-async-handler');
const {User,Admin} = require('../models/userSchema.js');
const generateToken = require('../utils/generateToken.js');

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  
  if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
    }); 
    
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await Admin.findOne({ email });
  
  if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await Admin.create({
      name,
      email,
      password,
    }); 
    
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getUsers = asyncHandler(async (req, res) => {  
  const users = await User.find({});
  if(users){
    res.status(201).json(users);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  authAdmin,
  registerAdmin,
  getUsers
};