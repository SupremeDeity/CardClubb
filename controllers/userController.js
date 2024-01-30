const asyncHandler = require("express-async-handler");
const { User, Admin, passwordReset, Receivers } = require("../models/userSchema.js");
const generateToken = require("../utils/generateToken.js");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");



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
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
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
        throw new Error("User already exists");
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
        throw new Error("Invalid user data");
    }
});

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await Admin.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
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
        throw new Error("Invalid user data");
    }
});

const passwordResetRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const token = uuidv4();
    const expires = Date.now() + 7200000; // Token expires in 1 hour

    await passwordReset.create({
        user: user._id,
        token,
        expires,
    });

    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/reset/password/${token}`;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ACC,
            pass: process.env.EMAIL_PASS,
        },
    });

    
    const htmlContent = `
    <!DOCTYPE PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        </head>
        <body>
            <table role="presentation">
              <tr>
                <td>
                  Click on the link to  Reset Your Password 
                  <a href=${resetUrl}>
                    <button style="cursor: pointer;color: white;background: black;font-size: 1rem;height: 40px;border: none;border-radius: 12px;width: 150px;">Link</button>
                  </a>
                </td>
              </tr>
            </table>
        </body>
    </html>
`;
    // Setup email data
    const mailOptions = {
        from: process.env.EMAIL_ACC,
        to: email,
        subject: "Password Reset Request",
        html: htmlContent,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send("Password reset email sent");
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const resetToken = await passwordReset.findOne({
        token,
        expires: { $gt: Date.now() },
    });

    if (!resetToken) {
        res.status(400).json({ message: "Invalid or expired token" });
        return;
    }

    const user = await User.findById(resetToken.user);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    // Set the new password and save the user
    user.password = password;
    await user.save();

    // Remove the used reset token from the database
    await passwordReset.deleteOne({ token });

    res.status(200).json({ message: "Password reset successful" });
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.status(201).json(users);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    const user = await User.findOne({_id:id});
    if (user) {
        await User.deleteOne({_id:user._id})
        res.status(200).json({message:"deleted successfully"});
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const deleteReceiver = asyncHandler(async (req, res) => {
    const { id } = req.body
    const user = await Receivers.findOne({_id:id});
    if (user) {
        await Receivers.deleteOne({_id:user._id})
        res.status(200).json({message:"deleted successfully"});
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    authAdmin,
    registerAdmin,
    getUsers,
    passwordResetRequest,
    resetPassword,
    deleteUser,
    deleteReceiver
};
