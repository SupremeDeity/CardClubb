const asyncHandler = require("express-async-handler");
const Email = require("../models/userSchema")
const nodemailer = require("nodemailer");

const getEmailCards = asyncHandler(async (req, res) => {
    const email = await Email.findOne({});
    if(email){
      res.status(201).json(email);
    } else {
      res.status(400);
      throw new Error('Not Found');
    }
});

const addEmailCards = asyncHandler(async(req,res)=>{
    const { name, email } = req.body;
    const front = req.files["front"][0].buffer;
    const envelope = req.files["envelope"][0].buffer;
    
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
                            <a href="https://your-website.com/open-card">
                                <button style="cursor: pointer;color: white;background: black;font-size: 1rem;height: 40px;border: none;border-radius: 12px;width: 150px;">Open Card</button>
                            </a>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
`;
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_ACC,
        replyTo: process.env.EMAIL_ACC,
        subject: `New Greeting Card from ${name}`,
        html: htmlContent,
        attachments: [
            {
                filename: "front.png",
                content: front,
                encoding: "base64",
                cid: "frontImage",
            },
            {
                filename: "envelope.png",
                content: envelope,
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
        res.status(200).send("Email sent: " + info.response);
    });
});

module.exports = { getEmailCards,addEmailCards };

