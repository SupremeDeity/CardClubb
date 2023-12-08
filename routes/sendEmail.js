const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

router.get("/",(req,res)=>{
    res.send("Hello")
})

router.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter
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

module.exports = router;
