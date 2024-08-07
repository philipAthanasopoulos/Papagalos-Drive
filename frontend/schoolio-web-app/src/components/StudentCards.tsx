import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface User {

  username: string;
}

const StudentList: React.FC = () => {
  const [users, setusers] = useState<User[]>([]);


  useEffect(() => {
    const fetchusers = async () => {
      try {
        // const res = await axios.get<User[]>('https://schoolio.onrender.com/users');
        const res = await axios.get<User[]>('http://localhost:8080/users');
 
        setusers(res.data);
        console.log(res.data); 
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchusers();
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <div>
              <p>{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;