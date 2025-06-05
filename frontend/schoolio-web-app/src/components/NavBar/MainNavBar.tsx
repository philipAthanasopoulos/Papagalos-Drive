import {Col, Image, NavDropdown, Row} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import colors from '../../colors';
import papagalos_png from '../../images/papagalos_comic.png';
import React from "react";
import avatar from "../../images/Profile Interface-cuate.svg"

const MainNavBar = () => {

    return (
        <Navbar style={{background: colors.shamrock_green}} collapseOnSelect expand="lg">
            <Container>
                <Link to={"/main"} className='me-5 text-decoration-none'>
                    <Col>
                        <Row>
                            <Image src={papagalos_png} height={120} className=''/>
                        </Row>
                    </Col>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto h5">
                        <Nav.Link className='text-light' href="/">
                            Αρχική🏠
                        </Nav.Link>
                        <Nav.Link className='text-light' href="/folder/1">Σημειώσεις📗</Nav.Link>
                        <Nav.Link className='text-light' href="/news">Νέα📢</Nav.Link>
                        <Nav.Link className='text-light' href="/forum">Forum📬</Nav.Link>
                        <Nav.Link className='text-light' href="/help">
                            Υποστήριξη🎧
                        </Nav.Link>
                    </Nav>
                    <Nav className={"h5"}>
                        {localStorage.getItem("user") ? (
                            <Nav.Link href={"/profile"} className={"text-light"}>
                                <Image src={avatar}/>
                            </Nav.Link>
                        ) : (
                            <Nav.Link href={"/login"} className={"text-light"}>
                                <picture>
                                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp"
                                            type="image/webp"/>
                                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif" alt="👋"
                                         width="32" height="32"/>
                                </picture>
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default MainNavBar;