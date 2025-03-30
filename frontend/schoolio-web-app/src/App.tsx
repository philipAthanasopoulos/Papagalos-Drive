import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect} from 'react';
import {Alert, Container} from 'react-bootstrap';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import './App.css';
import {FolderComponent} from './components/Folder/FolderComponent';
import {Footer} from './components/Footer';
import {LoginForm} from './components/Login/LoginForm';
import Hero from './components/MainPage/Hero';
import MainNavBar from './components/NavBar/MainNavBar';
import {NoteComponent} from './components/Note/NoteComponent';
import {SupportSection} from './components/SupportSection';
import {NewsArticleHolder} from "./components/News/NewsArticleHolder";
import {RegisterForm} from "./components/Register/RegisterForm";


function App() {
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({top: 0, left: 0, behavior: "auto"});
    }, [location.pathname])

    return (
        <div className="App">
            <header className="App-header">
                <MainNavBar/>
                <Alert variant={"warning"} className="text-center justify-content-center">
                    🚧👷‍♂️ Ο Παπαγάλος είναι ακόμα <u>υπό κατασκευή</u>. Ορισμένες λειτουργίες μπορεί να μην δουλεύουν
                    ακόμα.👷‍♂️🚧
                </Alert>
                <Container className="d-flex flex-column  align-items-center min-vh-100">
                    <Routes>
                        <Route path="/" element={<Navigate to="/main"/>}/>
                        <Route path="/folder/:id" element={<FolderComponent/>}/>
                        <Route path="/note/:id" element={<NoteComponent/>}/>
                        <Route path="/help" element={<SupportSection/>}/>
                        <Route path="/main" element={<Hero/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/news" element={<NewsArticleHolder/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                    </Routes>
                </Container>
                <Footer/>
            </header>
        </div>
    );
}

export default App;