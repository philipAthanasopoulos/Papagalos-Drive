import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { FolderComponent } from './components/Folder/FolderComponent';
import { Footer } from './components/Footer';
import { LoginForm } from './components/Login/LoginForm';
import Hero from './components/MainPage/Hero';
import MainNavBar from './components/NavBar/MainNavBar';
import { NoteComponent } from './components/Note/NoteComponent';
import { SupportSection } from './components/SupportSection';
import {NewsArticleComponent} from "./components/News/NewsArticleComponent";
import {NewsArticleHolder} from "./components/News/NewsArticleHolder";


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
              <Route path="/news" element={<NewsArticleHolder/>} />
            </Routes>
          </Container>
          <Footer />
        </header>
      </div>
  );
}

export default App;