import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar';
import { Container } from 'react-bootstrap';
import { FolderComponent } from './components/FolderComponent';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Note from './components/Note';
import {Footer} from './components/Footer';

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
          <footer>
            <Footer />
          </footer>
        </header>
      </div>
    </Router>
  );
}

export default App;