import React from 'react';

const SharedNotes = ({ notes, onEdit }) => {
  return (
    <div>
      {notes.map(note => (
        <div key={note._id} className="note border p-2 mb-2">
          <h3 className="note-title text-xl font-bold mb-2">{note.title}</h3>
          <div className='note-content' dangerouslySetInnerHTML={{ __html: note.content }} />
          {note.ownerId && note.ownerId.name && (
            <p className="text-gray-600">Created by: {note.ownerId.name}</p>
          )}
          <button onClick={() => onEdit(note)} className="bg-yellow-500 text-white p-2 mr-2">
            Edit Note
          </button>
        </div>
      ))}
    </div>
  );
};

export default SharedNotes;