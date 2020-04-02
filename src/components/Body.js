import React from 'react';
import Note from './Note';

function Body(props) {
  const notes = props.notes.map(note => <Note key = {note.id} check = {props.check} titleChange = {props.titleChange} textChange = {props.textChange} click = {props.click} note = {note}/>);

  return (notes);
}

export default Body;
