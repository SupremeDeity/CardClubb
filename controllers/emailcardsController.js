const asyncHandler = require("express-async-handler");
const { Email, Receivers } = require("../models/userSchema");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const getEmailCards = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const email = await Email.findOne({ id });

        if (!email) {
            return res.status(404).json({ error: "Not found" });
        }
        const base64Encode = (buffer) => {
            return buffer.toString("base64");
        };

        res.json({
            id: email.id,
            text: email.text,
            color: email.color,
            size: email.size,
            family: email.family,
            front: email.front,
            image: email.image,
            envelope: email.envelope,
            custom: email.custom,
            stamp: email.stamp,
            envelopeOpen: email.envelopeOpen,
        });
    } catch (error) {
        console.error("Error fetching:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const addEmailCards = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            senderemail,
            receiveremail,
            content,
            size,
            family,
            color,
            front,
            envelope,
            custom,
            image,
            stamp,
            envelopeOpen,
        } = req.body;
        const cards = await Email.create({
            id: uuidv4(),
            text: content,
            color: color,
            size: size,
            family: family,
            front: {
                mime_type: front.split(",")[0],
                content: front.split(",")[1],
            },
            image: {
                mime_type: image.split(",")[0],
                content: image.split(",")[1],
            },
            envelope: {
                mime_type: envelope.split(",")[0],
                content: envelope.split(",")[1],
            },
            custom: {
                mime_type: custom.split(",")[0],
                content: custom.split(",")[1],
            },
            stamp: {
                mime_type: stamp.split(",")[0],
                content: stamp.split(",")[1],
            },
            envelopeOpen: {
                mime_type: envelopeOpen.split(",")[0],
                content: envelopeOpen.split(",")[1],
            },
        });
        const userExists = await Receivers.find({ receiveremail });
        if (userExists) {
            console.log("Reciever User exists");
        }else{
            const receivers = await Receivers.create({
                name: name,
                email: receiveremail,
            });
        }
        if (cards) {
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
                    <style>
                    .faux-absolute{
                        max-height:0;
                        position:relative;
                        opacity:0.999;
                      }
                      .faux-position{
                        margin-top: 1.7em;
                        margin-left: 28.5em;
                        display:inline-block;
                      }
                    </style>
                    </head>
                    <body>
                        <table role="presentation">
                            <tr>
                                <td style="text-align:center;color:black;font-size:1.3rem;">
                                    May your days be merry and bright filled with love and delight
                                </td>
                            </tr>
                            <tr>
                                <br />
                            </tr>
                            <tr>
                                <td style="position:relative;">
                                <div class="faux-absolute">
        	                        <div class="faux-position">
                                        <img src="cid:envelopeImage" alt="Envelope Image" style="width:61px;height:61px;">
        	                        </div>
                                </div>
                                    <img src="cid:frontImage" alt="Envelope Image">
                                </td>
                            </tr>
                            <tr>
                                <br />
                            </tr>
                            <tr>
                                <td>
                                    <a href="https://cardclub.vercel.app/open/card/${cards.id}">
                                        <button style="cursor: pointer;color: white;background: black;font-size: 1rem;height: 40px;border: none;border-radius: 12px;width: 150px;">Open Card</button>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
        `;
            const mailOptions = {
                from: senderemail,
                to: receiveremail,
                replyTo: receiveremail,
                subject: `New Greeting Card from ${name}`,
                html: htmlContent,
                attachments: [
                    {
                        filename: cards.image.mime_type,
                        content: cards.image.content,
                        encoding: "base64",
                        cid: "frontImage",
                    },
                    {
                        filename: cards.stamp.mime_type,
                        content: cards.stamp.content,
                        encoding: "base64",
                        cid: "envelopeImage",
                    },
                ],
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                res.status(200).send("Email sent");
            });
        } else {
            res.status(400).json({ message: "Invalid data" });
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error in addEmailCards:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const getReceivers = asyncHandler(async (req, res) => {
    const data = await Receivers.find();
    if (data) {
        res.status(201).json({ data });
    } else {
        res.status(401);
        throw new Error("Error");
    }
});
module.exports = { getEmailCards, addEmailCards, getReceivers };
