const express = require('express')
const router = express.Router()
const Note = require('../models/note')

router.get('/', async (req, res) => {
  try{
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


//Remove notes and update notes
router.post('/', async (req, res) => {
  try{
    const noteList = [];
    Note.find({})
    .then(list => {
      noteList = list.map(note => {
          return note.id;
      });
      req.json()
    })
    .then(data => {
      console.log(data);
      const notes = data.notes;
      const removed = data.removed;
      //Update each note
      /*notes.forEach(element => {

      })*/

      removed.forEach(element => {

      })

    })
  } catch {
    res.send('Err')
  }
})


module.exports = router;
