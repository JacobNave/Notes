import React from 'react';
import './style.css';
import Header from './components/Header';
import Body from './components/Body';
const serverUrl = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      removed: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
  }

  handleSelect(id) {
    var ran = false;
    this.setState(prevState => {
      if(ran) {
        return {};
      }
      ran = !ran;
      const updated = prevState.notes.map(note => {
        if(note.id == id) {
          note.selected = !note.selected;
        }
        return note;
      });
      console.log(updated);
      return {notes:updated};
    });
  }

  removeSelected() {
    var removedNotes = [];
    this.setState(prevState => {
      const updated = prevState.notes.filter(note => {
        if(!note.selected) {
          removedNotes.push(note);
        }
        return !note.selected;
      });
      const updatedRemoved = prevState.removed.concat(removedNotes);
      return {notes: updated, removed: updatedRemoved};
    });
  }

  addNote() {
    this.setState(prevState => {
      const updated = prevState.notes.slice();
      var newId = (updated.length > 0) ? (updated[updated.length - 1].id + 1) : 1;
      updated.push({
        id: newId,
        title: 'New Note',
        text: '',
        date: new Date(),
        open: false,
      });
      return {notes: updated};
    });
  }

  //FIX THIS SPAGHETTI CODE
  handleClick(id) {
    var count = 0;
    this.setState(prevState => {
      const updated = prevState.notes.map(note => {
        count += 1;
        if(count <= prevState.notes.length) {
          if(note.id === id) {
            note.open = !note.open;
          } else {
            note.open = false;
          }
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

  componentWillUnmount() {
    const serverNotes = this.state.notes.map(note => {
      let newNote = {
        id: note.id,
        title: note.title,
        text: note.text,
        date: note.date,
      }
    });
    const serverRemoved = this.state.removed.map(note => {
      let newNote = {
        id: note.id,
        title: note.title,
        text: note.text,
        date: note.date,
      }
    });
    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes: serverNotes,
        removed: serverRemoved,
      })
    })
  }


  handleChange(event) {
    const {id, value} = event.target;
    this.setState(prevState => {
      const updated = prevState.notes.map(note => {
        if(note.id == id) {
          note.text = value;
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
