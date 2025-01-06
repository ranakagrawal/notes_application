import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import NoteList from './NoteList';
import SharedNotes from './SharedNotes';
import api from '../../services/api';


function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);
  const quillRef = useRef();
  const editorRef = useRef();
  const navigate = useNavigate();

  const fetchNotes = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to access notes.');
      navigate('/');
      return;
    }

    try {
      const [notesResponse, sharedResponse] = await Promise.all([
        api.get('/notes/all', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get('/notes/shared', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setNotes(notesResponse.data.data);
      setSharedNotes(sharedResponse.data.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Error fetching notes. Please try again.');
    }
  }, [navigate]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['code-block']
          ]
        },
      });

      quillRef.current.on('text-change', () => {
        setNewNote(prev => ({
          ...prev,
          content: quillRef.current.root.innerHTML
        }));
      });
    }
  }, []);

  const handleCreateNote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to create notes.');
      navigate('/');
      return;
    }

    if (!newNote.title || !quillRef.current.getText().trim()) {
      alert('Note title and content cannot be empty.');
      return;
    }

    try {
      const content = quillRef.current.root.innerHTML;
      const response = await api.post('/notes/create',
        {
          title: newNote.title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes([...notes, response.data]);
      setNewNote({ title: '', content: '' });
      quillRef.current.setText('');
      alert('Note created successfully.');
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Error creating note. Please try again.');
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setNewNote({ title: note.title, content: note.content });
    quillRef.current.root.innerHTML = note.content;
  };

  const handleUpdateNote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to update notes.');
      navigate('/');
      return;
    }

    if (!newNote.title || !quillRef.current.getText().trim()) {
      alert('Note title and content cannot be empty.');
      return;
    }

    try {
      const content = quillRef.current.root.innerHTML;
      const response = await api.put(`/notes/${editingNote._id}`,
        {
          title: newNote.title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(notes.map(note => (note.id === editingNote._id ? response.data : note)));
      setSharedNotes(sharedNotes.map(note => (note.id === editingNote.id ? response.data : note)));
      setNewNote({ title: '', content: '' });
      quillRef.current.setText('');
      setEditingNote(null);
      alert('Note updated successfully.');
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Error updating note. Please try again.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to delete notes.');
      navigate('/');
      return;
    }

    try {
      await api.delete(`/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter(note => note.id !== noteId));
      setSharedNotes(sharedNotes.filter(note => note.id !== noteId));
      alert('Note deleted successfully.');
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error deleting note. Please try again.');
    }
  };

  const handleShareNote = async (noteId, email) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to share notes.');
      navigate('/');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await api.post(`/notes/${noteId}/share`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Note shared successfully.');
    } catch (error) {
      console.error('Error sharing note:', error);
      alert('Error sharing note. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Live Note Sharing</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{editingNote ? 'Edit Note' : 'Create a New Note'}</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <div ref={editorRef} className="mb-4 border rounded" style={{ height: '200px' }}></div>
        <button
          onClick={editingNote ? handleUpdateNote : handleCreateNote}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingNote ? 'Update Note' : 'Create Note'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
          <NoteList notes={notes} onShare={handleShareNote} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Shared Notes</h2>
          <SharedNotes notes={sharedNotes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;