import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import papagalos_png from '../images/papagalos.png'
import { Image } from 'react-bootstrap';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect  expand ="lg" className="bg-light">
      <Container>
        <Image src={papagalos_png}  width={100}/>
        <Navbar.Brand href='/'>Παπαγαλος</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Σημειώσεις</Nav.Link>
            <Nav.Link href="/">Νέα</Nav.Link>
            <NavDropdown title="Ενέργειες" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/">Action</NavDropdown.Item>
              <NavDropdown.Item href="/">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="/">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="/">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;