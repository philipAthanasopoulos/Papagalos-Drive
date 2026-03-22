import {Button, Col, Dropdown, DropdownButton, Image, Modal, Row} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import colors from '../../colors';
import papagalos_png from '../../images/papagalos_comic.png';
import React, {useState} from "react";
import avatar from "../../images/Profile Interface-cuate.svg"
import {logout} from "../../api/api";
import {User} from "../Login/User";

const MainNavBar = () => {
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response.status === 200) {
                localStorage.removeItem("user");
                window.location.assign("/");
            } else {
                alert("Could not log out");
            }
        } catch (error) {
            alert("An error occurred during logout");
        }
    };

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
                        {user ? (
                            <Col className={"d-flex align-items-center"}>
                                <div className={"text-light me-3"}>{user.grapes}🍇</div>
                                <Link to={"/profile"} className={" me-2"}>
                                    <Image src={avatar}/>
                                </Link>
                                <DropdownButton title="⚙️" variant={"white"}>
                                    <Dropdown.Item onClick={() => setShowLogoutModal(true)}>Logout
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
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
                <Modal show={showLogoutModal} centered>
                    <Modal.Header>
                        <Modal.Title>Βεβαίωση αποσύνδεσης</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Είστε σίγουροι ότι θέλετε να αποσυνδεθείτε;
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                            Cancel
                        </Button>
                        <Button className={"border-0"} style={{backgroundColor: colors.carrot_orange}}
                                onClick={handleLogout}>
                            <picture>
                                <source
                                    srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp"
                                    type="image/webp"/>
                                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
                                     alt="👋"
                                     width="32" height="32"/>
                            </picture>
                            Logout
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        </Navbar>

    )
        ;
}

export default MainNavBar;