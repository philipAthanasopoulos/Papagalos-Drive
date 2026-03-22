import {User} from "../Login/User";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {fileIcons} from "../FileIcons";
import React, {useEffect, useState} from "react";
import {NoteDTO} from "../Note/NoteDTO";
import {getUserFavoriteNotes, removeFavoriteNote} from "../../api/api";
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
            getUserFavoriteNotes().then((notesData) => {
                const fetchedNotes: NoteDTO[] = notesData.map((note: any) => new NoteDTO(note));
                setFavoriteNotes(fetchedNotes);
            });
        }
    }, [user]);

    const removeNote = async (note: NoteDTO) => {
        removeFavoriteNote(note.id).then((responce) => {
            if (responce.status === 200) {
                setFavoriteNotes(favoriteNotes.filter((n) => n.id !== note.id));
            } else alert("Could not remove note")
        })
    }

    if (!user) {
        return null;
    }

    return (
        <Container className="py-4">
            <Row className="mb-4 align-items-center">
                <Col xs="auto">
                    <Image src={avatar} width={80} height={80} style={{objectFit: 'cover'}} roundedCircle/>
                </Col>
                <Col>
                    <div className="fs-5 fw-semibold">👤 {user.firstName} {user.lastName}</div>
                    <div className="text-muted">📧 {user.email}</div>
                    <div className="mt-1">🍇 {user.grapes} grapes</div>
                </Col>
            </Row>
            <Row className={"pt-2"}>
                <Col>
                    <h2>🔖Saved notes</h2>
                    {favoriteNotes.length === 0 && (
                        <p className="text-muted mt-3">Δεν έχεις αποθηκευμένες σημειώσεις ακόμα.</p>
                    )}
                    {favoriteNotes.map((note, index) => (
                        <Row key={index} className="mb-3">
                            <Col>
                                <hr/>
                                <div className="d-flex flex-wrap align-items-center gap-2">
                                    <Link to={`/note/${note.id}`} className='btn btn-light btn-lg'>
                                        {fileIcons[note.type.toLowerCase()]}
                                        <span className='ms-2'>
                                            {note.name}.{note.type.toLowerCase()}
                                            <span className='ms-4 text-muted'>
                                                {note.uploadDate ? new Date(note.uploadDate).toLocaleDateString() : ''}

                                            </span>
                                        </span>
                                    </Link>
                                    <Button className={"btn-light btn-lg bi-bookmark-x btn-outline-danger"}
                                            onClick={() => removeNote(note)}/>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}
