import React from 'react';
import {FaTrash} from 'react-icons/fa'

function Header(props) {
  return (<header className = 'header'>
    <div>Notes</div>
    <button type = "button" onClick = {props.deleteNotes} className = "deleteButton"><FaTrash size = "35"/></button>
    <button onClick = {props.addNote} type = "button" className = "addButton">+</button>
    </header>
  );
}

export default Header;
