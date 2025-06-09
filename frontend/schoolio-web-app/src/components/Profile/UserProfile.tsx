import {User} from "../Login/User";
import {Button, Card, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {fileIcons} from "../FileIcons";
import React, {useEffect, useState} from "react";
import {NoteDTO} from "../Note/NoteDTO";
import {getUserFavoriteNotes, logout, removeFavoriteNote} from "../../api/api";
import avatar from "../../images/Profile Interface-cuate.svg"


export const UserProfile = () => {
    const navigate = useNavigate();
    const user: User = JSON.parse(localStorage.getItem("user") || "null");
    const [favoriteNotes, setFavoriteNotes] = useState<NoteDTO[]>([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user) {
            const notes: NoteDTO[] = []
            getUserFavoriteNotes().then((notesData) => {
                const notes: NoteDTO[] = notesData.map((note: any) => new NoteDTO(note));
                setFavoriteNotes(notes);
            });
        }
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

    if (!user) {
        return null;
    }

    return (
        <Container>
            <Row xs={12} md={6}>
                <Col className={"col-md-4"}>
                    <Image src={avatar} className="w-50"/>
                </Col>
            </Row>
            <Row className="fs-4 mt-4">
                👤: {user.firstName} {user.lastName}
            </Row>
            <Row className="fs-4">
                📧: {user.email}
            </Row>
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
                                <Button className={"ms-4 btn-light btn-lg bi-bookmark-x btn-outline-danger"}
                                        onClick={() => removeNote(note)}/>
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}
