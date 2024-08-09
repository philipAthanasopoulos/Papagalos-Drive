import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar';
import { Container } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import Folder from './components/Folder';
import construction_image from './images/construction.jpg';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainNavBar />
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <h1>This site is under construction!</h1>
          <Image src={construction_image} width={500} />
          <Folder id={'66a230c8b52d530969c6818c'} />
        </Container>
      </header>
    </div>
  );
}

export default App;
