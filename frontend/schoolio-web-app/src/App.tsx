import React from 'react';
import logo from './logo.svg';
import './App.css';
import StudentList from './components/StudentCards';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StudentList />
      </header>
    </div>
  );
}

export default App;
