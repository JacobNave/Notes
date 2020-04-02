import React from 'react';
import './style.css';
import Header from './components/Header';
import data from './data';
import Body from './components/Body';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: data.map(note => {return({
        id: note.id,
        title: note.title,
        text: note.text,
        date: note.date,
        open: false,
        selected: false,
      })}),}
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
    this.setState(prevState => {
      const updated = prevState.notes.filter(note => {
        return !note.selected;
      });
      return {notes: updated};
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
