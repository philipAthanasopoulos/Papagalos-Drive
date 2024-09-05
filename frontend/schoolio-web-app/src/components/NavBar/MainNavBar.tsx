import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import papagalos_png from '../../images/papagalos.png'
import papagalos_title from '../../images/papagalos.svg';
import { Collapse, DropdownButton, DropdownDivider, DropdownItem, Image } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkHeart, BoxArrowLeft, FileEarmarkPerson, Headphones, Headset, Info, InfoCircle, InfoLg, Person, PersonCircle } from 'react-bootstrap-icons';
import colors from '../../colors';

const MainNavBar = () => {

  return (
        <Navbar bg='light' fixed='top' collapseOnSelect expand="lg">
          <Container>
            <Link to={"/main"} className='me-5'>
              <Image src={papagalos_png}  width={50} className='me-2' />
              <Image src={papagalos_title} width={150} />
            </Link>
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
                <Nav.Link href ="/forum">Forum</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/">
                  <InfoCircle /> About
                </Nav.Link>
                <Nav.Link eventKey={2} href="/help">
                  <Headset /> Υποστήριξη
                </Nav.Link>
                <DropdownButton variant="light" size='lg' title={<PersonCircle/>} className='me-4' >
                <DropdownItem>
                  <FileEarmarkPerson/>  Το προφίλ μου
                </DropdownItem>
                <DropdownItem>
                  <BookmarkHeart/>  Οι σημειώσεις μου
                </DropdownItem>
                <DropdownDivider/>
                <DropdownItem>
                  <BoxArrowLeft/> Αποσύνδεση
                </DropdownItem>
              </DropdownButton>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  );
}

export default MainNavBar;