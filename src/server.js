//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//start application server on port 3000
app.listen(3000, () => {
    console.log("The server started on port 3000");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
    // sendMail(user, (err, info) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(400);
    //         res.send({ error: "Failed to send email" });
    //     } else {
    //         console.log("Email has been sent");
    //         res.send(info);
    //     }
    // });
});


var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "communicationsByInvicta@gmail.com",
        pass: "C@pstone123"
    }
});

var mailOptions = {
    from: '"Invicta" communicationsByInvicta@gmail.com',
    to: 'grm16@students.uwf.edu',
    subject: 'Invicta Travel Update',
    text: 'This is an update regarding your travel plans to: country',
    html: '<b>Hey there! </b><br> This is a test message containing no useful information because the program does not work properly yet<br/> '
};

