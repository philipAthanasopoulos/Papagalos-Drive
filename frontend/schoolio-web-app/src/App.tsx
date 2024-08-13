import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar';
import { Container } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import construction_image from './images/construction.jpg';
import { FolderComponent } from './components/FolderComponent';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Note from './components/Note';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <MainNavBar />
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <Routes>
              <Route path="/" element={<Navigate to="folder/1" />} />
              <Route path="/folder/:id" element={<FolderComponent />} />
              <Route path="/file/:id" element={<Note />} />
            </Routes>
          </Container>
        </header>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <h1>This site is under construction!</h1>
      <Image src={construction_image} width={500} />
    </>
  );
}

export default App;