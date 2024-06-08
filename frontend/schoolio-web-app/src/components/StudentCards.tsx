import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {findAllByDisplayValue} from "@testing-library/react";

interface Address {
    country: string;
    city: string;
    postalCode: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  address: Address;
  favouriteSubjects: string[];
  totalSpentInBooks: number; 
  created: string; 
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get<Student[]>('https://schoolio.onrender.com/api/students');
        setStudents(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <div>
              <p>{student.firstName} {student.lastName}</p>
              <p>{student.gender}</p>
              <p>{student.email}</p>
              <p>{student.address.country}, {student.address.city}, {student.address.postalCode}</p>
              <p>{student.favouriteSubjects}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;