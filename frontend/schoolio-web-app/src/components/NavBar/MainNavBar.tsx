import {Image, NavDropdown} from 'react-bootstrap';
import {Headset, InfoCircle} from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import colors from '../../colors';
import papagalos_png from '../../images/cool.png';
import papagalos_title from '../../images/textLogo.png';
import React from "react";
import under_construction from '../../images/under_construction.png';

const MainNavBar = () => {

    return (
        <Navbar style={{background: colors.shamrock_green,}} fixed='top' collapseOnSelect expand="lg">
            <Container>
                <Link to={"/main"} className='me-5'>
                    <Image src={papagalos_png} width={80} className='me-1'/>
                    <Image src={papagalos_title} width={150}/>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='text-light' href="/folder/1">Σημειώσεις</Nav.Link>
                        <Nav.Link className='text-light' href="/news">Νέα</Nav.Link>
                        <NavDropdown title={<span className='text-light'>Ενέργειες</span>}>
                            <NavDropdown.Item href="/">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className='text-light' href="/forum">Forum</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className='text-light' href="/">
                            <InfoCircle/> About
                        </Nav.Link>
                        <Nav.Link className='text-light' eventKey={2} href="/help">
                            <Headset/> Υποστήριξη
                        </Nav.Link>
                        {/*<DropdownButton size='lg' title={<PersonCircle/>} className='me-4'>*/}
                        {/*    <DropdownItem>*/}
                        {/*        <FileEarmarkPerson/> Το προφίλ μου*/}
                        {/*    </DropdownItem>*/}
                        {/*    <DropdownItem>*/}
                        {/*        <BookmarkHeart/> Οι σημειώσεις μου*/}
                        {/*    </DropdownItem>*/}
                        {/*    <DropdownDivider/>*/}
                        {/*    <DropdownItem>*/}
                        {/*        <BoxArrowLeft/> Αποσύνδεση*/}
                        {/*    </DropdownItem>*/}
                        {/*</DropdownButton>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavBar;