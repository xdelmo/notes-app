import React from "react";

export default function Sidebar(props) {
  //   console.log(props.notes);

  // Display only the first line of note.body as the note summary in the sidebar
  function getTitleNote(noteBody) {
    // Split the body's note in an array value every string which ends with "\n"
    // Get the first array's value with [0] index
    // Remove every non alphanumeric characters from the string
    const titleNote = noteBody.split("\n")[0].replace(/[^a-z0-9 -]/gi, "");
    return titleNote;
  }

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{getTitleNote(note.body)}</h4>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
