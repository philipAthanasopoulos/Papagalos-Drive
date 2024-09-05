import axios from 'axios';
import React,{ReactNode, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { webApi } from '../../env/env';
import ReactLoading from 'react-loading';
import DocViewer, { DocViewerRenderers, PDFRenderer } from 'react-doc-viewer';
import { NoteDTO } from "./NoteDTO";
import colors from '../../colors';
import Skeleton from 'react-loading-skeleton';
import { File } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';
import { fileIcons } from '../FileIcons';

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

  const getRandomColor = () => {
    const colorValues= Object.values(colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
  };
  
  const displayMedia = () => {
    return (
      <iframe
        className='flex-grow-1 vh-100'
        style={{ width: '100%', border: 'none' }}
        src={`data:${mimeTypes[note?.type.toLowerCase() ?? '']};base64,${blob}`}
      />
    );
  };

  return (
    <Container>
        <div className='row-12 pt-5 '>
            <div className='col-12'>
            {loading ? (
                <div className='d-flex justify-content-center'>
                  <ReactLoading type='bubbles' color={getRandomColor()} />
                </div>
              ) : (
                <div>
                  <h5 className='pe-5 d-flex text-primary mb-4 ' >
                        {note?.path+"."+note?.type.toLowerCase() || <Skeleton  width={100} />}
                        {fileIcons[note?.type.toLowerCase() || ""]}
                  </h5>
                  {displayMedia()}
                </div>
              )}
            </div>
        </div>
    </Container>
  );

}
