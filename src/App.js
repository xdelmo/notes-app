import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import Footer from "./components/Footer";

export default function App() {
  //   localStorage.clear();

  // When the app first loads, initialize the notes state
  // with the notes saved in localStorage. You'll need to
  // use JSON.parse() to turn the stringified array back
  // into a real JS array.
  const [notes, setNotes] = React.useState(function() {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  // LAZY STATE INITIALIZATION (Function/arrow function in state initializing)
  // Lazily initialize our `notes` state so it doesn't
  // reach into localStorage on every single re-render
  // of the App component

  // Before getting notes[0].id check if notes[0] exists
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  // Every time the `notes` array changes, save it in localStorage.
  // You'll need to use JSON.stringify() to turn the array into a string to save in localStorage.
  // useEffect because localStorage is a side effects which React can't handle
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  // When the user edits a note, reposition
  // it in the list of notes to the top of the list
  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          // The unshift() method adds one element to the beginning of the array and returns the new length of the array.
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function deleteNote(event, noteId) {
    // Prevent to remain selected on just deleted note
    event.stopPropagation();
    // Return oldNotes that has filtered out selected note to delete based on its id
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <div>
      <main>
        {notes.length > 0 ? (
          <Split sizes={[30, 70]} direction="horizontal" className="split">
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {currentNoteId && notes.length > 0 && (
              <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
            )}
          </Split>
        ) : (
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
