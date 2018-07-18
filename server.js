const express = require('express')
const server = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')

mongoose.connect("mongodb://ravanibhavik:asdfgf1234@ds239911.mlab.com:39911/backend-project")
    .then(() => {
        console.log("=== Connected to Database ===")
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(">>> Error Connecting to Database <<<")
    })

server.get("/", (req, res) => {
    return res.status(200).json({hello: 'world'})
})
