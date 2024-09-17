import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/NavBar/MainNavBar';
import { Container } from 'react-bootstrap';
import { FolderComponent } from './components/Folder/FolderComponent';
import { BrowserRouter as Router, Routes, Route, Navigate, ScrollRestoration, useLocation } from 'react-router-dom';
import {Footer} from './components/Footer';
import { useEffect } from 'react';
import { SupportSection } from './components/SupportSection';
import { NoteComponent } from './components/Note/NoteComponent';
import Hero from './components/MainPage/Hero';
import { LoginForm } from './components/Login/LoginForm';


function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({top:0,left:0,behavior:"auto"});
  },[location.pathname])

  return (
      <div className="App">
        <header className="App-header">
          <MainNavBar />
          <Container className="d-flex flex-column  align-items-center" style={{marginTop:"70px",minHeight:"100vh"}}>
            <Routes>
              <Route path="/" element={<Navigate to="/main" />} />
              <Route path="/folder/:id" element={<FolderComponent />} />
              <Route path="/note/:id" element={<NoteComponent />} />
              <Route path="/help" element={<SupportSection />} />
              <Route path="/main" element={<Hero />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </Container>
          <Footer />
        </header>
      </div>
  );
}

export default App;