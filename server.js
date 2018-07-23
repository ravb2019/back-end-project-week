const express = require('express')
const cors = require('cors')
const server = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const Note = require('./models/Notes')

server.use(express.json())
server.use(cors())

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

server.get("/notes", (req, res) => {
    Note.find({})
        .then(notes => {
            return res.status(200).json(notes)
        })
        .catch(error => {
            return res.status(500).json({errorMessage: "Error fetching data from db."})
        })
})

server.get("/notes/:id", (req, res) => {
    const { id } = req.params
    Note.findById(id)
        .then(note => {
            if (note === null) {
                return res.status(404).json({message: `Unable to find note with id: ${id}`})
            } else {
                return res.status(200).json(note)
            }
        })
        .catch(error => {
            return res.status(500).json({
                errorMessage: "Valid id is required."
            })
        })
})

server.post("/notes/new", (req, res) => {
    console.log(req.body)
    Note.create(req.body)
        .then(newNote => {
            res.status(201).json(newNote)
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'Unable to add note.'})
        })
})

server.put("/notes/edit/:id", (req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    Note.findByIdAndUpdate(id, req.body)
        .then(note => {
            if (note === null) {
                return res.status(404).json({message: `Unable to find note with Id ${id}`})
            } else {
                return res.status(200).json({...note.toObject(), title, content })
            }
        })
        .catch(error => {
            return res.status(500).json({
                errorMessage: "Something went wrong."
            })
        })
})

server.delete("/notes/delete/:id", (req, res) => {
    const { id } = req.params
    Note.findByIdAndRemove(id)
        .then(note => {
            if (note === null) {
                return res.status(404).json({message: `Unable to find note with Id ${id}`})
            } else {
                return res.status(204).json({message: 'Note deleted.'})
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: "Something went wrong."})
        })
})