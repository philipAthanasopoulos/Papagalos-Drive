import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Folder from './Folder'
import './styles/folder.css'
import './styles/note.css'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
// const LOCAL_API_URL = 'http://localhost:8080';
const REMOTE_API_URL = 'https://schoolio.onrender.com';
const API_URL = REMOTE_API_URL;
type Props = {}


const Folders = (props: Props) => {
  const [folder, setFolder] = useState<Folder>();
  const fileInput = React.createRef<HTMLInputElement>();

  const fetchNotes = async (folderId:string) => {
      try {
        const res = await axios.get<Folder>(`${API_URL}/folder/${folderId}`);
        setFolder(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  useEffect(() => {
    fetchNotes('root');
  }, []);

  function showDocument(base64Url:string){
      var win = window.open();
      win?.document.write("<img src=\"" + base64Url + "\"></img>");
  }

  function navigateToFolder(folderName:string){ 
    fetchNotes(folderName);
  }

  function createSubFolder(){
    const folderName = prompt("Please enter the folder name")?.toString();
    if(folderName != null){
      if (folderName != null) {
        axios.post(`${API_URL}/folder/add?parentFolderId=${folder?.id || 'root'}&subfolderName=${folderName}`).then(() => {
          fetchNotes(folder?.id || 'root')});
      }
    }
  }

  function uploadNote(): void {
    if (fileInput.current?.files && fileInput.current.files.length > 0) {
      const file = fileInput.current.files[0];
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', 'title');
      formData.append('targetFolder', folder?.name || 'root');

      axios.post(`${API_URL}/notes/add`, formData);
    }
  }

  return (
    <div>
        <h1>Folder: {folder?.name}</h1>
        <div>
          <input type="file" id="file" name="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" ref={fileInput} />
          <button className ="add-note-button" onClick={() => uploadNote()}>upload</button>
        </div>
        <div>
          <button className ="add-folder-button" onClick={() => createSubFolder()}>Add Folder</button>
        </div>

        {/* Subfolders */}
        <div>
          {folder?.subFolders.map((subFolder,index) => (
            <div key={index}>
              <button className='folder-button' onClick={() => navigateToFolder(subFolder.id)}><span className="emoji">📁</span>{subFolder.name}</button>
            </div> 
          ))}
        </div>

        {/* Notes */}
        <div>
          {folder?.notes.map((note,index) => (
            <div key={index}>
            <button className='note-button' onClick={() => showDocument(`data:image/jpeg;base64,${note.file}`)}><span className="emoji">📝</span>{note.fileName}</button>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Folders;