import axios from 'axios';
import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { webApi } from '../env/env';

export default function Note() {
  const id = useParams<{ id: string }>().id;
  const [base64String, setBase64String] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');


  useEffect(() => {
    fetchBlobData().then((response) => {
      setBase64String(response.data.data);
    });
  }, [fetchBlobData]);

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

  
  async function fetchBlobData() {
    return await axios.get(`${webApi}/blob/${id}`);
  }

  return (
    <div className='vh-100 vw-100 d-flex flex-column'>
      <embed 
        className='flex-grow-1 w-100'
        src={`data:${type};base64,${base64String}`}
      />
    </div>
  );

}
