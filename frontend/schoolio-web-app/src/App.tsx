import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar';
import { Container } from 'react-bootstrap';
import Folder from './components/Folder';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainNavBar />
        <Container className="d-flex justify-content-center align-items-center">
          <Folder id={'66a230c8b52d530969c6818c'} />
        </Container>
      </header>
    </div>
  );
}

export default App;
