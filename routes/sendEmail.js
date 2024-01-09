const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fieldNameSize: 999999999, fieldSize: 999999999 },
});
const {
    getEmailCards,
    addEmailCards,
} = require("../controllers/emailcardsController");
dotenv.config();

router.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ACC,
            pass: process.env.EMAIL_PASS,
        },
    });
    // Setup email data
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_ACC,
        replyTo: process.env.EMAIL_ACC,
        subject: `New Email from ${name}`,
        text: message,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send("Email sent: " + info.response);
    });
});

router.post(
    "/send-email-card",
    upload.fields([
        { name: "front" },
        { name: "envelope" },
        { name: "custom" },
        { name: "image" },
        { name: "envelopeOpen" },
        { name: "stamp" },
    ]),
    addEmailCards
);

router.post("/get/cards/:id", getEmailCards);

module.exports = router;
