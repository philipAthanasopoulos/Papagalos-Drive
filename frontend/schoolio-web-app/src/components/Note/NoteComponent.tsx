import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import colors from '../../colors';
import { webApi } from '../../env/env';
import { fileIcons } from '../FileIcons';
import { DownloadFileButton } from './DownloadFileButton';
import { NoteDTO } from "./NoteDTO";
import LoadingComponent from "../Loading/LoadingComponent";

export const NoteComponent = () => {
  const id = Number(useParams<{ id: string }>().id);
  const [note, setNote] = useState<NoteDTO>();
  const [blob, setBlob] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    async function fetchNote() {
      try {
        const { data } = await axios.get<NoteDTO>(`${webApi}/note/${id}`);
        setNote(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching note:', error);
        fetchNote();
      }
    }

    fetchNote();
  }, [id]);

  useEffect(() => {
    if (note) {
      const fetchBlobData = async () => {
        try {
          const response = await axios.get(`${webApi}/blob/${note.mongoId}`);
          setBlob(response.data.data);
        } catch (error) {
          console.error('Error fetching blob data:', error);
          fetchBlobData();
        } finally {
          setLoading(false);
        }
      }

      fetchBlobData();
    }
  }, [note]);

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
    return (
      <iframe
        title="note"
        className='flex-grow-1 vh-100'
        style={{ width: '100%', border: 'none' }}
        src={`data:${mimeTypes[note?.type.toLowerCase() ?? '']};base64,${blob}`}
      />
    );
  };

  return (
    <Container fluid>
    <Row className='pt-5'>
      <Col xs={12}>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div>
            <div className='d-flex text-primary mb-4 align-items-center '>
              <div className='d-flex text-primary mb-4 align-items-center'>
              <h5>
                {note?.path + "." + note?.type.toLowerCase() || <Skeleton width={100} />}
              </h5>
              
              {fileIcons[note?.type.toLowerCase() || ""]}
              <div className='ms-3'>
                <DownloadFileButton filename={note?.name || "file"} downloadString={`data:${mimeTypes[note?.type.toLowerCase() ?? '']};base64,${blob}`} />
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
