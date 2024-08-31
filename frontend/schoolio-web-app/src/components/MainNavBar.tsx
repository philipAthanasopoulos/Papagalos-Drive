import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import papagalos_png from '../images/papagalos.png';
import papagalos_title from '../images/papagalos.svg';
import { Collapse, Image } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import './css/MainNavBar.css'
import { SearchBar } from './SearchBar';
import { FolderDTO } from './FolderDTO';

const MainNavBar = () => {
  const [position, setPosition] = useState(window.scrollY)
  const [visible, setVisible] = useState(true) 
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(()=> {
      const handleScroll = () => {
          let currentPosition = window.scrollY
          let deltaY = position - currentPosition;
          if(currentPosition < 30) setVisible(true);
          else if(deltaY > 40) {
            setVisible(true);
            setPosition(currentPosition)
          } else if (deltaY < 0){
            setVisible(false);
            setPosition(currentPosition)
          }  
      };
      window.addEventListener("scroll", handleScroll);
      return(() => {
          window.removeEventListener("scroll", handleScroll);
      })
  })

  useEffect(() => {
    if (navbarRef.current) {
      document.body.style.paddingTop = `${navbarRef.current.offsetHeight}px`;
    }
  }, []);

  const show = visible ? "visible" : "invisible";

  return (
        <Navbar ref={navbarRef} collapseOnSelect expand="lg" className={`bg-light fixed-top ${show}` }>
          <Container>
            <Image src={papagalos_png}  width={100}/>
            <Image src={papagalos_title} width={150} className='me-5' />
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
                <Nav.Link href="/">About</Nav.Link>
                <Nav.Link eventKey={2} href="/help">
                  Υποστήριξη
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  );
}

export default MainNavBar;