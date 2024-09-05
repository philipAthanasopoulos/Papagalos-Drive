import React, { ChangeEvent, useEffect, useState } from 'react'
import { FloatingLabel, FormControl, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import cosineSimilarity from 'compute-cosine-similarity'
import { FolderDTO } from '../Folder/FolderDTO'

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
  
  //GOATED
  const search = () => {
    const matchingResults = props.folder?.subFolderNames
    .map(folderName => ({
      name: folderName,
      similarity: calculateSimilarity(replaceTonus(folderName.replace("Πανεπιστήμιο","")), replaceTonus(query))
    }))
    .filter(result => result.similarity > 0.5)
    .sort((a, b) => b.similarity - a.similarity)
    .map(result => result.name);    
    setResults(matchingResults || []);
  }

  const reset = () => {
    setQuery('');
    setResults([]);
  }

  function replaceTonus(str: string): string {
    const tonusMap: { [key: string]: string } = {
      'ά': 'α',
      'έ': 'ε',
      'ή': 'η',
      'ί': 'ι',
      'ό': 'ο',
      'ύ': 'υ',
      'ώ': 'ω',
      'Ά': 'Α',
      'Έ': 'Ε',
      'Ή': 'Η',
      'Ί': 'Ι',
      'Ό': 'Ο',
      'Ύ': 'Υ',
      'Ώ': 'Ω',
      'ς': 'σ',
      'a': 'α',
      'b': 'β',
      'c': 'ψ',
      'd': 'δ',
      'e': 'ε',
      'f': 'φ',
      'g': 'γ',
      'h': 'η',
      'i': 'ι',
      'j': 'ξ',
      'k': 'κ',
      'l': 'λ',
      'm': 'μ',
      'n': 'ν',
      'o': 'ο',
      'p': 'π',
      'q': 'κ',
      'r': 'ρ',
      's': 'σ',
      't': 'τ',
      'u': 'θ',
      'v': 'β',
      'w': 'ο',
      'x': 'χ',
      'y': 'υ',
      'z': 'ζ',
    };
  
    return str.split('').map(char => tonusMap[char] || char).join('');
  }

  function isGreekCharacter(character:string):boolean{
    const charCode = character.charCodeAt(0);
    return charCode>944 && charCode < 944+24;
  }

  function calculateSimilarity(sentence:string,anotherSentence:string) {
    const matrix = new Array(24).fill(0);
    const anotherMatrix = new Array(24).fill(0);

    for(let letter of sentence)
      if(isGreekCharacter(letter))
        matrix[letter.charCodeAt(0) - 945]++;
    
    for(let letter of anotherSentence)
      if(isGreekCharacter(letter))
        anotherMatrix[letter.charCodeAt(0) - 945]++;
    
    return cosineSimilarity(matrix,anotherMatrix) || 0;
  }
  
  return (
    <div >
        <FloatingLabel label="Αναζήτησε εδώ..." controlId='floatingInput'>
          <FormControl placeholder=''  size='lg' value={query} as={'input'} onChange={(e) => setQuery(e.target.value)} />
        </FloatingLabel>
        <ListGroup style={{position: "absolute",zIndex: "10",backgroundColor: "white" }} >
          {
            results.map((result) => (
              <Link to={`/folder/${getFolderId(result)}`} onClick={()=>reset()} style={{color:'black',textDecoration:'none'}}>
                <ListGroupItem >
                  {result}
                </ListGroupItem>
              </Link>
            ))
          }
        </ListGroup>
    </div>    
  )
}