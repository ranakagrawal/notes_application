import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteList from './NoteList';
import SharedNotes from './SharedNotes';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to access notes.');
        // navigate('/login');
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:7000/notes/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data.data);
  
        const sharedResponse = await axios.get('http://localhost:7000/notes/shared', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSharedNotes(sharedResponse.data.data);
      } catch (error) {
        console.error('Error fetching notes:', error.response?.data || error.message);
        alert('Error fetching notes. Please log in again.');
      }
    };
  
    fetchNotes();
  }, []);
  

  // useEffect(()=>{
  //   console.log('token:', localStorage.getItem('token'));
  // }, []);

  return (
    <div className="p-5">
      <h1>Your Notes</h1>
      <NoteList notes={notes} />
      <h1>Shared Notes</h1>
      <SharedNotes notes={sharedNotes} />
    </div>
  );
};

export default Dashboard;
