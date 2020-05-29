const express = require('express')
const router = express.Router()
const Note = require('../models/note')
const ObjectID = require('mongodb').ObjectID

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
    if(req.body.removed) { //if sent a removed item
      Note.deleteOne({_id: req.body.removed}, err => {
        if(err) console.log(err);
      })
    }else if (req.body.added) { //if added item is sent
      var newId = new ObjectID();
      var newNote = new Note({title: req.body.added.title, text: req.body.added.text ,_id: newId})
      newNote.save(newNote, err => {
        if(err) console.log(err);
      });
      res.json({oldId: req.body.added.id, newId: newId});
    }

  } catch(err) {
    console.log(err)
  }
})


module.exports = router;
