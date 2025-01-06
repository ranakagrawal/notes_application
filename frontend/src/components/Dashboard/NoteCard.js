import React from 'react';
import './NoteCard.css';

const NoteItem = ({
  note,
  shareEmails,
  handleEmailChange,
  handleShare,
  onEdit,
  onDelete,
}) => {
  return (
    <div key={note._id} className="note border p-2 mb-2">
      <h3>{note.title}</h3>
      <span className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />

      {note.sharedWith && note.sharedWith.length > 0 && (
        <div className="shared-with mb-2">
          <h4 className="font-bold">Shared With:</h4>
          <ul className="list-disc pl-5">
            {note.sharedWith.map((user, index) => (
              <li key={index}>{user.name} ({user.email})</li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="email"
        placeholder="Share with email"
        value={shareEmails[note._id] || ''}
        onChange={(e) => handleEmailChange(note._id, e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={() => handleShare(note._id)}
        className="bg-blue-500 text-white p-2 mr-2"
      >
        Share Note
      </button>
      <button
        onClick={() => onEdit(note)}
        className="bg-yellow-500 text-white p-2 mr-2"
      >
        Edit Note
      </button>
      <button
        onClick={() => onDelete(note._id)}
        className="bg-red-500 text-white p-2"
      >
        Delete Note
      </button>
    </div>
  );
};

export default NoteItem;