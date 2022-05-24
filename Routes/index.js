const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer")
// Importing Schemas
const Bio = require("../schemas/addBio");
const Cert = require("../schemas/addCert");
const AddEdu = require("../schemas/addEdu");
const AddExper = require("../schemas/addExper");
const Skill = require("../schemas/addSkills");
const Service = require("../schemas/addservices");
const res = require('express/lib/response');
const { getMaxListeners } = require('../schemas/addBio');

router.get("/", async (req, res) => {

    // Bio Start
    let biodata;
    await Bio.find()
        .then((result) => {
            biodata = result
        })
        .catch((error) => {
            console.log(error)
        })
    // Certificate Start
    let certificate
    await Cert.find()
        .then((result) => {
            certificate = result
        })
        .catch((error) => {
            console.log(error);
        })
    // Education Start
    let education
    await AddEdu.find()
        .then((result) => {
            education = result
        })
        .catch((error) => {
            console.log(error);
        })
    // Exper Start
    let exper
    await AddExper.find()
        .then((result) => {
            exper = result
        })
        .catch((error) => {
            console.log(error);
        })
    // Services Start
    let services;
    await Service.find()
        .then((result) => {
            services = result;
            // console.log(services);
        })
        .catch((error) => {
            console.log(error);
        });
    // Skill Start
    let skill;
    await Skill.find()
        .then((result) => {
            skill = result;
        })
        .catch((error) => {
            console.log(error);
        });

    res.render("index", { title: "Home", biodata, certificate, education, exper, services, skill })
})

// Email Route Start
router.post('/', (req, res) => {

    let username = req.body.name
    let email = req.body.email
    let message = req.body.message

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `usamabsadiq@gmail.com`, // sender address
        to: "usamabsadiq@gmail.com", // list of receivers
        subject: "Someone has filled the contact form", // Subject line 
        html: output // html body
    };
    let mailOptions1 = {
        from: `usamabsadiq@gmail.com`, // sender address
        to: email, // list of receivers
        subject: "Thank You For Filling Our Form", // Subject line
        text: "Our technical team will contact ASAP" // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("SUCCESS!!");
            res.redirect("/");
        }
    });
    transporter.sendMail(mailOptions1, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("SUCCESS!!");
            res.redirect("/");
        }
    });
})
// Email Route End
module.exports = router