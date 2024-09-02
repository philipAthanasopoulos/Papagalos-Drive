import axios from 'axios';
import React,{ReactNode, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { webApi } from '../../env/env';
import ReactLoading from 'react-loading';
import DocViewer, { DocViewerRenderers, PDFRenderer } from 'react-doc-viewer';
import { NoteDTO } from "./NoteDTO";

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

  const unsupported = ["docx","doc","xls","xlsx"];
  

  //This is because papagalos is a parrot and he likes colors
  const colors: string[] = [
    "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6",
    "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
    "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A",
    "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC",
    "#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC",
    "#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399",
    "#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680",
    "#4D8066", "#809980", "#E6FF80", "#1AFF33", "#999933",
    "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3",
    "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF"
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const displayMedia = () => {
      return (
        <iframe 
        className='flex-grow-1 w-100'
        src={`data:${mimeTypes[note?.type.toLowerCase() ?? '']};base64,${blob}`}
      />
      )
  }

  return (
    <div className='vw-100 vh-100 d-flex flex-column'>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <ReactLoading type='bubbles' color={getRandomColor()} />
        </div>
      ) : (
        displayMedia()
      )}
    </div>
  );

}
