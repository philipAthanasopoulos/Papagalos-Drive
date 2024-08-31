import React, { ChangeEvent, useEffect, useState } from 'react'
import { FolderDTO } from './FolderDTO'
import { FormControl, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {folder?: FolderDTO}

export const SearchBar = (props: Props) => {
  const [query,setQuery] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    search();
  },[query])

  
  const getFolderId = (folderName:string) => {
    const index = props.folder?.subFolderNames.indexOf(folderName);
    return props.folder?.subFolderIds[index || 0];
  }
  
  const search = () => {
    const matchingResults = query.trim() === '' ? [] : props.folder?.subFolderNames.filter((folderName) => folderName.toLowerCase().includes(query));
    setResults(matchingResults || []);
  }

  const reset = () => {
    setQuery('');
    setResults([]);
  }
  
  return (
    <div>
        <FormControl placeholder='Search...' size='lg' value={query} as={'input'} onChange={(e) => setQuery(e.target.value)}></FormControl>
        <ListGroup>
          {
            results.map((result) => (
              <ListGroupItem>
                <Link to={`/folder/${getFolderId(result)}`} onClick={()=>reset()} style={{color:'black',textDecoration:'none' }}>{result}</Link>
              </ListGroupItem>
            ))
          }
        </ListGroup>
    </div>    
  )
}