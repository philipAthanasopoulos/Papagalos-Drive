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
            <iframe
                title="note"
                className='vh-100'
                style={{width: '100%', height: '100%', border: 'none', objectFit: 'contain'}}
                src={`data:${mimeType};base64,${note?.data}`}
            />
        );
    };

    return (
        <Container fluid>
            <Row className='mb-5'>
                <Col xs={12}>
                    {loading ? (
                        <LoadingComponent/>
                    ) : (
                        <div>
                            <div className='d-flex text-primary mb-4 align-items-center '>
                                <div className='d-flex text-primary mb-4 align-items-center'>
                                    {fileIcons[note?.type.toLowerCase() || ""]}
                                    <div className='ms-3'>
                                        <DownloadFileButton filename={note?.name || "file"}
                                                            downloadString={`data:${mimeTypes[note?.type.toLowerCase() ?? '']};base64,${note?.data}`}/>
                                    </div>
                                </div>
                            </div>
                            <div className='embed-responsive embed-responsive-16by9'>
                                {displayMedia()}
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );

}
