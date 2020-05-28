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
  console.log('post')
  try{
    Note.deleteOne({_id: req.body.removed}, err => {
      if(err) console.log(err);
      console.log(req.body.removed);
    })
    /*let noteList = [];
    Note.find({})
    .then(list => {
      noteList = list.map(note => {
          return note.id;
      });
    })
    .then(() => {
      //console.log(data);
      //const notes = data.notes;
      //const removed = data.removed;
      //Update each note
      /*notes.forEach(element => {

      })


    })*/


  } catch(err) {
    console.log(err)
  }
})


module.exports = router;
