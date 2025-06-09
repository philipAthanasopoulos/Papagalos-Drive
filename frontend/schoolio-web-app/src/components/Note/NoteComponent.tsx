import {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import {useParams} from 'react-router-dom';
import {fileIcons} from '../FileIcons';
import {DownloadFileButton} from './DownloadFileButton';
import LoadingComponent from "../Loading/LoadingComponent";
import {getNoteById} from "../../api/api";
import {NoteDTODetailed} from "./NoteDetailedDTO";

export const NoteComponent = () => {
    const id = Number(useParams<{ id: string }>().id);
    const [note, setNote] = useState<NoteDTODetailed>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchNote() {
            try {
                const data = await getNoteById(id);
                setNote(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error('Error fetching note:', error);
                fetchNote();
            }
        }

        fetchNote();
    }, [id]);

    const mimeTypes: { [key: string]: string } = {
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        txt: "text/plain",
        csv: "text/csv",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        mp4: "video/mp4",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        zip: "application/zip",
        rar: "application/x-rar-compressed"
    };

    const displayMedia = () => {
        const defaultMimeType = "application/octet-stream";
        const mimeType = mimeTypes[note?.type.toLowerCase() ?? ''] || defaultMimeType;
        return (
            <embed
                title={note?.name}
                src={`data:${mimeType};base64,${note?.data}`}
            />
        );
    };

    if (loading) return <LoadingComponent/>

    return (
        <Container>
            <Row className='text-secondary mb-2 h4'>
                {note?.name}
            </Row>
            <Row className='text-secondary mb-2'>
                🗓️ {new Date(note?.uploadDate || Date.now()).toLocaleDateString()}
            </Row>
            <Row className={"mb-2"}>
                <DownloadFileButton filename={note?.name || "file"}
                                    downloadString={`data:${mimeTypes[note?.type.toLowerCase() ?? '']};base64,${note?.data}`}/>
            </Row>
            <Row fluid className={"min-vh-100"}>
                {displayMedia()}
            </Row>
        </Container>
    );
}
