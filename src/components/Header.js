import React from 'react';

function Header(props) {
  return (<header className = 'header'>
    <div>Notes</div>
    <button type = "button" onClick = {props.deleteNotes} className = "deleteButton">-</button>
    <button onClick = {props.addNote} type = "button" className = "addButton">+</button>
    </header>
  );
}

export default Header;
