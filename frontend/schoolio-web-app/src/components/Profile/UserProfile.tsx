import {User} from "../Login/User";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fileIcons} from "../FileIcons";
import React, {useEffect, useState} from "react";
import {NoteDTO} from "../Note/NoteDTO";
import {getUserFavoriteNotes, removeFavoriteNote} from "../../api/api";
import avatar from "../../images/Profile Interface-cuate.svg"


export const UserProfile = () => {
    const user: User = JSON.parse(localStorage.getItem("user") || "null");
    const [favoriteNotes, setFavoriteNotes] = useState<NoteDTO[]>([]);

    useEffect(() => {
        const notes: NoteDTO[] = []
        getUserFavoriteNotes().then((notesData) => {
            const notes: NoteDTO[] = notesData.map((note: any) => new NoteDTO(note));
            setFavoriteNotes(notes);
        });
    }, []);

    const removeNote = async (note: NoteDTO) => {
        removeFavoriteNote(note.id).then((responce) => {
            console.log(responce)
            if (responce.status === 200) window.location.reload()
            else alert("Could not remove note")
        })
    }

    return (
        <Container>
            <Row className={"justify-content-left"}>
                <Image src={avatar} className="w-25"/>
            </Row>
            <Row className="fs-4">👤{user.firstName} {user.lastName}</Row>
            <Row className="fs-4">📧{user.email}</Row>
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
