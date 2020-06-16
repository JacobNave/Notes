import React from 'react';
import './style.css';
import Header from './components/Header';
import Body from './components/Body';
const serverUrl = "http://localhost:3001";
var lastEdit = Date.now()
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteCount: 0,
      notes: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.timeout = this.timeout.bind(this);
  }

  handleSelect(id) {
    this.setState(prevState => {
      const updated = prevState.notes.map(note => {
        if(note.id == id) {
          note.selected = !note.selected;
        }
        return note;
      });
      return {notes:updated};
    });
  }

  removeSelected() {
    var removedNotes = [];
    this.setState(prevState => {
      const updated = prevState.notes.filter(note => {
        if(note.selected) {
          //delete from server
          fetch(serverUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              removed: note.id,
            })
          })
        }
        return !note.selected;
      });
      return {notes: updated};
    });
  }

  addNote() {
    this.setState(prevState => {
      const updated = prevState.notes.slice();
      var newId = this.state.newNoteCount;
      var newNote = {
        id: newId,
        title: 'New Note',
        text: '',
        date: (new Date()).toISOString(),
        open: false,
      };
      updated.push(newNote);

      //add in server
      fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          added: newNote,
        })
      }).then(response => response.json())
        .then(data => {
        //console.log(data);
        this.setState(prevState => {
          const newState = prevState.notes;
          //swap temp id with database id
          newState.forEach(note => {
            if(note.id == data.oldId) {
              note.id = data.newId; //assign id
            }
          });
          return {notes: newState};
      });
      });

      return {notes: updated, newNoteCount: newId + 1};
    });
  }


  handleClick(id) {
    this.setState(prevState => {
      const updated = prevState.notes.map(note => {
          if(note.id === id) {
            note.open = !note.open;
          } else {
            note.open = false;
          }
        return note;
      });
    return {notes: updated};
  });
  }

  componentDidMount() {
    fetch(serverUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      const notesData = data.notes[0].map(newNote => {
        let note = {
          id: newNote._id,
          title: newNote.title,
          text: newNote.text,
          date: newNote.date,
          open: false,
          selected: false,
        }
        return note;
      })
      this.setState({notes: notesData});
    })
  }


  updateNote(updatedNote) {
    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        update: updatedNote,
      })
    })
  }

  timeout(changedNote){
    var currentTime = Date.now()
    if(currentTime - lastEdit >= 1000){
      this.updateNote(changedNote)
    }
  }

  handleChange(event) {
    const {id, value} = event.target;
    this.setState(prevState => {
      const updated = prevState.notes.map(note => {
        if(note.id == id) {
          note.text = value;

          lastEdit = Date.now()//update last edit time
          setTimeout(() => this.timeout(note), 1500)
        }
        return note;
      });
      return {notes: updated};
    })
  }


  handleTitleChange(event) {
    const {id, value} = event.target;
    this.setState(prevState => {
      const updated = prevState.notes.map(note => {
        if(note.id == id) {
          note.title = value;

          lastEdit = Date.now()//update last edit time
          setTimeout(this.timeout(note), 1500)
        }
        return note;
      });
      return {notes: updated};
    })
  }

  render() {
    return (
      <div className="App">
        <Header addNote = {this.addNote} deleteNotes = {this.removeSelected}/>
        <Body click = {this.handleClick} check = {this.handleSelect} titleChange = {this.handleTitleChange} textChange = {this.handleChange} notes = {this.state.notes}/>
      </div>
    );
  }

}

export default App;
