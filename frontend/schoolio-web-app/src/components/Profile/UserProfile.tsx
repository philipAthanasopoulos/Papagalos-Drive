import {User} from "../Login/User";
import {Button, Card, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fileIcons} from "../FileIcons";
import React, {useEffect, useState} from "react";
import {NoteDTO} from "../Note/NoteDTO";
import {getUserFavoriteNotes, logout, removeFavoriteNote} from "../../api/api";
import avatar from "../../images/Profile Interface-cuate.svg"


export const UserProfile = () => {
    const user: User = JSON.parse(localStorage.getItem("user") || "null");
    const [favoriteNotes, setFavoriteNotes] = useState<NoteDTO[]>([]);
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

    useEffect(() => {
        const notes: NoteDTO[] = []
        getUserFavoriteNotes().then((notesData) => {
            const notes: NoteDTO[] = notesData.map((note: any) => new NoteDTO(note));
            setFavoriteNotes(notes);
        });
    }, []);

    const removeNote = async (note: NoteDTO) => {
        removeFavoriteNote(note.id).then((responce) => {
            if (responce.status === 200) {
                setFavoriteNotes(favoriteNotes.filter((n) => n.id !== note.id));
            } else alert("Could not remove note")
        })
    }

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
        <Container>
            <Container className={"justify-content-center"}>
                <Row xs={12} md={6}>
                    <Col xs={12} md={6}>
                        <Image src={avatar} className="w-25"/>
                    </Col>
                </Row>
                <Row className="fs-4 mt-4">
                    👤{user.firstName} {user.lastName}
                </Row>
                <Row className="fs-4">
                    📧 {user.email}
                </Row>
                <Row>
                    <Col>
                        <Button className="btn-light" onClick={() => setShowLogoutModal(true)}>⬅️ Logout</Button>
                        <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Βεβαίωση αποσύνδεσης</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Είστε σίγουροι ότι θέλετε να αποσυνδεθείτε;
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleLogout}>
                                    <picture>
                                        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp"
                                                type="image/webp"/>
                                        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif" alt="👋"
                                             width="32" height="32"/>
                                    </picture>
                                    Logout
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>


            <Row className={"pt-5"}>
                <Col>
                <h2>🔖Saved notes</h2>
                    {favoriteNotes.map((note, index) => (
                        <Row key={index} className="mb-3">
                            <Col>
                                <hr/>
                                <Link to={`/note/${note.id}`} className='btn btn-light btn-lg'>
                                    {fileIcons[note.type.toLowerCase()]}
                                    <span className='ms-2'>
                                        {note.name}.{note.type.toLowerCase()}
                                        <span className='ms-4 text-muted'>
                                            {note.uploadDate ? new Date(note.uploadDate).toLocaleDateString() : ''}

                                        </span>
                                    </span>
                                </Link>
                                <Button style={{backgroundColor: "white", border: "none"}}
                                        onClick={() => removeNote(note)}>❌</Button>
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </Container>
);
}
