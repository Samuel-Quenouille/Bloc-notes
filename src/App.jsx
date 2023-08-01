import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import MarkdownInput from './components/MarkdownInput';
import NoteDisplay from './components/NoteDisplay';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');
  const localStorageKey = 'blocNote';

  useEffect(() => {
    const storedNotes = localStorage.getItem(localStorageKey);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleSave = (markdown) => {
    const newNote = {
      title: `Note ${notes.length + 1}`,
      content: markdown,
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedNotes));
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index} onClick={() => handleNoteSelect(note)}>
              <strong>{note.title}</strong>
              <p>{note.content.slice(0, 15)}...</p>
            </li>
          ))}
        </ul>
        <button onClick={() => handleNoteSelect('')}>Ajouter une note</button>
      </div>
      <div>
        {selectedNote ? (
          <>
            <NoteDisplay markdown={selectedNote.content} />
            <MarkdownInput onSave={handleSave} />
          </>
        ) : (
          <p>Select a note or create a new one.</p>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));