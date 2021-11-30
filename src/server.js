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
    console.log("mail request came");
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

//define a getRestrictions endpoint 
app.get("/getRestrictions", (req, res) => {
    //console.log("restrictions request came");
    
    const fetch = require('node-fetch');

    const url = 'https://api.sandbox-travelperk.com/travelsafe/restrictions?destination=ES&destination_type=country_code&origin=DE&origin_type=country_code&date=2020-10-15';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Api-Version': '1',
            Authorization: 'ApiKey  IKrWbv.9O1htwMpRTU7W4uC6ygz5y5kLWYm3Mxh',
            'Accept-Language': 'en'
        }
    };

    res.setHeader('Content-Type', 'application/json');
    fetch(url, options)
        .then(res => res.json())
        //.then(json => console.log(json))
        .then(json => res.send(json))
        .catch(err => console.error('error:' + err));
})


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
    to: 'mattminish@gmail.com',
    subject: 'Invicta Travel Update',
    text: 'This is an update regarding your travel plans',
    html: '<b>Hey there! </b><br> Your trips authorization status has changed log in to see updates.<br/> '
};

