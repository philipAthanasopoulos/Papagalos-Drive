import axios from 'axios';
import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { webApi } from '../env/env';
import ReactLoading from 'react-loading';

export default function Note() {
  const id = useParams<{ id: string }>().id;
  const [base64String, setBase64String] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);


  useEffect(() => {
    fetchBlobData().then((data) => {
      setBase64String(data);
      setLoading(false);
    }
    );
  }, []);

  useEffect(() => {
    detectMimeType();
  }, [base64String,detectMimeType]);

  const signatures: { [key: string]: string } = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg"
  };
  
  function detectMimeType() {
    for (var s in signatures) {
      if (base64String.indexOf(s) === 0) {
        setType( signatures[s]);
      }
    }
  }

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
  
  async function fetchBlobData() {
    return (await (axios.get(`${webApi}/blob/${id}`))).data.data;
  }

  return (
    <div className='vh-100 vw-100 d-flex flex-column'>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <ReactLoading type='bubbles' color={getRandomColor()} />
        </div>
      ) : (
        <iframe 
          className='flex-grow-1 w-100'
          src={`data:${type};base64,${base64String}`}
        />
      )}
    </div>
  );

}
