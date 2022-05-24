const express = require('express')
const main = express()
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const nodemailer = require('nodemailer')
const env = require("dotenv")

env.config()
const port = process.env.PORT

// Setting View Engine
main.set('view engine', 'ejs')

// Use below line for showing files in public folder to browser like css 7 javascript. 
main.use(express.static("public"))

// Using Body Parser
main.use(bodyparser.urlencoded({ extended: true }))
main.use(bodyparser.json())

// Establish Connection With Database
const dbURI = process.env.MONGODB_URI

// Connecting With Database
// Agr connection ma koi masla ho tw iss liye hum promise use kr ty ha, agr koi error ho tw console ma throw kr dy.
mongoose.connect(dbURI)
    .then((result) => {
        main.listen(port, () => {
            console.log(`Server is Started at ${port} & DB is Connected`);
        })
    })
    .catch((err) => {
        console.log("Failed to Connect DB", err)
    })

// Importing Routes
const home = require('./Routes/index')


main.use('/', home)