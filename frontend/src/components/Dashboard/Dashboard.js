// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import NoteList from './NoteList';
// import SharedNotes from './SharedNotes';
// import api from '../../services/api';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

// const Dashboard = () => {
//   const [notes, setNotes] = useState([]);
//   const [sharedNotes, setSharedNotes] = useState([]);
//   const [newNote, setNewNote] = useState({ title: '', content: '' });
//   const editorRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNotes = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('Please log in to access notes.');
//         navigate('/');
//         return;
//       }
  
//       try {
//         const response = await api.get('/notes/all', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setNotes(response.data.data);
  
//         const sharedResponse = await api.get('/notes/shared', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSharedNotes(sharedResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching notes:', error.response?.data || error.message);
//         alert('Error fetching notes. Please log in again.');
//       }
//     };
  
//     fetchNotes();
//   }, [navigate]);

//   useEffect(() => {
//     if (!editorRef.current || editorRef.current.quill) {
//       return; // Prevent re-initialization
//     }
  
//     editorRef.current.quill = new Quill(editorRef.current, {
//       theme: 'snow',
//       modules: {
//         toolbar: [
//           [{ header: [1, 2, false] }],
//           ['bold', 'italic', 'underline'],
//           [{ list: 'ordered' }, { list: 'bullet' }],
//           ['clean'],
//         ],
//       },
//     });
//   }, []);

//   const handleCreateNote = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please log in to create notes.');
//       navigate('/');
//       return;
//     }

//     if (!newNote.title || !editorRef.current.firstChild.innerHTML.trim()) {
//       alert('Note title and content cannot be empty.');
//       return;
//     }

//     try {
//       const content = editorRef.current.firstChild.innerHTML;
//       const response = await api.post('/notes/create', {
//         title: newNote.title,
//         content,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotes([...notes, response.data]);
//       setNewNote({ title: '', content: '' });
//       editorRef.current.firstChild.innerHTML = '';
//     } catch (error) {
//       console.error('Error creating note:', error.response?.data || error.message);
//       alert('Error creating note. Please try again.');
//     }
//   };

//   const handleShareNote = async (noteId, email) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please log in to share notes.');
//       navigate('/');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       alert('Please enter a valid email address.');
//       return;
//     }

//     try {
//       const response = await api.post(`/notes/${noteId}/share`, {
//         email,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Note shared successfully.');
//     } catch (error) {
//       console.error('Error sharing note:', error.response?.data || error.message);
//       alert('Error sharing note. Please try again.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className="flex flex-col items-center p-5">
//       <div className="w-full max-w-2xl flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-bold">Create a New Note</h1>
//         <button onClick={handleLogout} className="bg-red-500 text-white p-2">
//           Logout
//         </button>
//       </div>
//       <div className="w-full max-w-2xl mb-10">
//         <input
//           type="text"
//           placeholder="Note Title"
//           value={newNote.title}
//           onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//           className="border p-2 mb-2 w-full"
//         />
//         <div ref={editorRef} id="editor" className="border p-2 mb-2"></div>
//         <button onClick={handleCreateNote} className="bg-blue-500 text-white p-2 w-full">
//           Create Note
//         </button>
//       </div>
//       <div className="w-full max-w-2xl">
//         <h1 className="text-2xl font-bold mb-5">Your Notes</h1>
//         <NoteList notes={notes} onShare={handleShareNote} />
//       </div>
//       <div className="w-full max-w-2xl mt-10">
//         <h1 className="text-2xl font-bold mb-5">Shared Notes</h1>
//         <SharedNotes notes={sharedNotes} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;