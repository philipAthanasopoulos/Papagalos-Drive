import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Note {
  id: string,
  fileName: string,
  file: string // Base64
}

interface Props {}

const Notes = (props: Props) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get<Note[]>('http://localhost:8080/notes');
        setNotes(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchNotes();
  }, []);


  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note,index) => (
        <div key={index}>
          <a href={`data:image/png;base64,${note.file}`} target='_blank'>
          {note.fileName}
          <h1>{note.file}</h1>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Notes;