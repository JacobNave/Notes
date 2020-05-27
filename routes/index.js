const express = require('express')
const router = express.Router()
const Note = require('../models/note')

router.get('/', async (req, res) => {
  try{
    //const notes = await Note.find({})
    //res.send(notes)
    const noteList = []
    Note.find({}).then(note => {
      noteList.push(note);
    }).then(() => {
      res.json({notes: noteList})
    })
  } catch {
    res.send('Err')
  }
})


module.exports = router;
