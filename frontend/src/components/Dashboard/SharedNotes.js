import React from 'react';

const SharedNotes = ({ notes }) => (
  <div>
    {notes.map((note) => (
      <div key={note.id}>
        <h2>{note.title} (Shared by {note.ownerId.name})</h2>
        <p>{note.content}</p>
      </div>
    ))}
  </div>
);

export default SharedNotes;
