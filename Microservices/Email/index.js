const express = require('express');
var cors = require('cors')
const app = express();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "democera@gmail.com",
        pass: "Password@123",
    },
});

app.use(express.json());
app.use(cors())

app.post("/sendEmail", async (req, res) => {
    try {
        const { to, subject, text } = req.body;    // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'DemoSystem<democera@gmail.com>', // sender address
            to,
            subject,
            text
        });

        res.json({ message: "Email Sent" });
    }
    catch(err){
        res.sendStatus(500).json({message: "Something Went Wrong..."});
    }
});

const port = 7777;
app.listen(port, () => console.log(`Mail Service: Listening on port ${port}...`));