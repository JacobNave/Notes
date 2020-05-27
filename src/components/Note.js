import React from 'react';
import autosize from 'autosize';
function testClick() {
  console.log("test");
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.unfocus = false;
    this.state = {
      checkChange: props.check,
      titleChange: props.titleChange,
      click: props.click,
      textChange: props.textChange,
      note: props.note,
      editTitle: false,
    };
    this.changeEdit = this.changeEdit.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.check = this.check.bind(this);
  }

  //Toggles the note open and closed
  toggleOpen() {
    if(!this.state.editTitle) {
      if(!this.unfocus) {
        this.state.click(this.state.note.id);
      } else {
        this.unfocus = !this.unfocus;
      }
    } else {
      return;
    }
  }

  //Toggles the title from h3 to input
  changeEdit() {
    this.unfocus = true;
    this.setState(prevState => {
      return {editTitle: !prevState.editTitle};
    });
  }

  componentDidUpdate() {
    if(this.state.note.open) {
      autosize(this.textarea);
    }
  }

  //decides what format the title should be in based on editTitle
  getTitle() {
    var style = (this.state.note.title == "") ? {color: 'gray'} : {};
    var title = (this.state.note.title == '') ? "(Blank Note)" : this.state.note.title;
    if(!this.state.editTitle) {
      return <p style = {style} onClick = {this.changeEdit} className = 'noteTitle' >{title}</p>;
    } else {
      return <input autoFocus className = 'inputTitle' ref = {this.titleInput} id = {this.state.note.id} onBlur = {this.changeEdit} type = "text" onChange = {this.state.titleChange} value = {this.state.note.title}/>;
    }
  }

  check() {
    this.state.click(this.state.note.id);
    this.state.checkChange(this.state.note.id);
  }

  render() {

    if(this.state.note.open) {
      var style = {
      minWidth: '75%',
      maxWidth: '75%',
      resize:'none',
      maxHeight: '750px',
      minHeight: '20px'};

      return(
        <div className = "noteBody">
          <div className = "note" onClick = {() => this.toggleOpen()}>
            <input className = "checkbox" type = 'checkbox' checked = {this.state.note.selected} onChange = {this.check}/>
            {this.getTitle()}
            <p className = 'date'>{this.state.note.date.split("T")[0]}</p>
          </div>
          <textarea style = {style} ref={c=>this.textarea=c} onChange = {this.state.textChange} id={this.state.note.id} className = 'noteText' value = {this.state.note.text}/>
        </div>
      );
    }
    else {
      return (
        <div className = "noteClosed" onClick = {() => this.toggleOpen()}>
          <input className = "checkbox" type = 'checkbox' checked = {this.state.note.selected} onChange = {this.check}/>
          {this.getTitle()}
          <p className = 'date'>{this.state.note.date.split("T")[0]}</p>
        </div>
      );
    }
  }
}


export default Note;
