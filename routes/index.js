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
  try{
    if(req.body.removed) { //REMOVE NOTE
      Note.deleteOne({_id: ObjectID(req.body.removed)}, err => {
        if(err) console.log(err);
      })

    }else if (req.body.added) { //ADD NOTE
      var newId = new ObjectID();
      var newNote = new Note({title: req.body.added.title, text: req.body.added.text ,_id: newId})
      newNote.save(newNote, err => {
        if(err) console.log(err);
      });
      res.json({oldId: req.body.added.id, newId: newId});

    } else if (req.body.update) { //UPDATE NOTE
        Note.updateOne({_id: req.body.update.id}, {
          title: req.body.update.title,
          text: req.body.update.text
        }, err => {
          if(err) console.log(err)
        })
    }

  } catch(err) {
    console.log(err)
  }
})


module.exports = router;
