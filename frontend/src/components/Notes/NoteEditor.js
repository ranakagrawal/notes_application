// import React, { useContext, useEffect } from 'react';
// import { SocketContext } from '../../context/SocketContext';

// const NoteEditor = ({ noteId }) => {
//   const socket = useContext(SocketContext);

//   useEffect(() => {
//     socket.emit('join-note', noteId);

//     return () => {
//       socket.emit('leave-note', noteId);
//     };
//   }, [noteId, socket]);

//   return <div>Note Editor for Note ID: {noteId}</div>;
// };

// export default NoteEditor;
