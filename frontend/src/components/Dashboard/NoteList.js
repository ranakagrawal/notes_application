import React from 'react';

const NoteList = ({ notes }) => (
  <div>
    {notes.map((note) => (
      <div key={note.id}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    ))}
  </div>
);

export default NoteList;
