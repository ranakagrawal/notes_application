import React, { useState } from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, onShare, onEdit, onDelete }) => {
  const [shareEmails, setShareEmails] = useState({});

  const handleEmailChange = (noteId, email) => {
    setShareEmails({ ...shareEmails, [noteId]: email });
  };

  const handleShare = (noteId) => {
    const email = shareEmails[noteId];
    if (email) {
      onShare(noteId, email);
      setShareEmails({ ...shareEmails, [noteId]: "" });
    }
  };

  
  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          shareEmails={shareEmails}
          handleEmailChange={handleEmailChange}
          handleShare={handleShare}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NoteList;
