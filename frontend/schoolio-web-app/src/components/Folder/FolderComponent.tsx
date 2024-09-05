import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { webApi } from '../../env/env';
import { FolderDTO } from './FolderDTO';
import { Link, useParams } from 'react-router-dom';
import AddSubFolderButton from './AddSubFolderButton';
import AddFileButton from '../Note/AddFileButton';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import EmptyFolder from './EmptyFolder';
import { SearchBar } from '../Search/SearchBar';
import colors from '../../colors';
import { Col, Container, Row } from 'react-bootstrap';
import FileTypeFilterButton from './FileTypeFilterButton';
import { fileIcons } from '../FileIcons';
import { FolderFill } from 'react-bootstrap-icons';
import { NoteDTO } from '../Note/NoteDTO';

export const FolderComponent: React.FC = () => {
    const pathId= useParams<{ id: string }>().id;
    const id = Number(pathId);
    const [folder, setFolder] = useState<FolderDTO>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedFileType,setSelectedFileType] = useState<string>("");

    const fetchFolder = async () => {
        try {
            const response = await axios.get<FolderDTO>(`${webApi}/folder/${id}`);
            setFolder(response.data);
            setSelectedFileType("All");
            setIsLoading(false)
        } catch (error) {
            console.error('Error loading folder:', error);
            fetchFolder();
        }
    };

    useEffect(() => {
        fetchFolder();
    }, [id]);

    const displaySubFolderLinks = (): React.ReactNode => {
        if (!folder) return null;
        const { subFolderIds, subFolderNames } = folder;

        if(selectedFileType === "All" || selectedFileType === "Folder")
            return subFolderNames?.map((name, index) => (
            <div key={index}>
                <hr />
                <Link to={`/folder/${subFolderIds[index]}`} className='btn btn-light btn-lg'>
                    <FolderFill color={colors.yellow} /> {name}
                </Link>
            </div>
        ));
    };

    const displayNoteLinks = (): React.ReactNode => {
        let notesToDisplay:NoteDTO[] = folder?.notes.filter((note) => note.type.toLowerCase() === selectedFileType) ||  [];
        if(selectedFileType === "All") notesToDisplay = folder?.notes || [];
        return (
            <div>
                {notesToDisplay.map((note, index) => (
                    <div key={index}>
                    <hr />
                        <Link to={`/note/${note.id}`} className='btn btn-light btn-lg'>
                            {fileIcons[note.type.toLowerCase()]}
                            <span className='ms-2'>
                                {note.name} 
                                <span>
                                    .{note.type.toLowerCase()}
                                </span>
                                <span className='ms-4 text-muted'>
                                    {note.uploadDate ? new Date(note.uploadDate).toLocaleDateString() : ''}
                                </span>
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        );
    };
    
    const displayFilesBar = (): React.ReactNode => {
        return(
            <div>
            <Row>
                <Col className="d-flex align-items-center">
                    <h5 className="me-2">Όνομα</h5>
                </Col>
            </Row>
        </div>
        );
    }

    const displayFilterButtons = (): React.ReactNode => {
        const fileTypes = Array.from(new Set(folder?.notes.flatMap((note) => note.type.toLowerCase()))) || [];
        fileTypes.unshift("Folder");
        fileTypes.unshift("All");
        return(
                <div className='me-4'>
                    <FileTypeFilterButton 
                        fileTypes={fileTypes} 
                        selectedFileType={selectedFileType}
                        setSelectedFileType={setSelectedFileType}
                     />
                </div>
        )
    }

    const displayButtons = (): React.ReactNode => {
        return(
            <div className='d-flex'>
                <div className='me-5'>
                    <AddSubFolderButton id={pathId}/>
                </div>
                <div className='me-5'>
                    <AddFileButton id={pathId} />
                </div>
            </div>
        );
    }
    
    const displayLoadingSkeleton =(index:number): React.ReactNode => {
        return (
            <div>
                <hr />
                <div className='d-flex mb-4 mt-4'>
                    <Skeleton key={index} height={30} width={15} className='ms-3 me-1'/>
                    <Skeleton key={index} height={30} width={100} />
                </div>
            </div>
        )
    }
    
    return (
        <Container>
            <div className='row pt-5'>
                <div className='col-12'>
                    {isLoading && 
                        <div>
                            {Array.from({ length: 30 }).map((_, index) => displayLoadingSkeleton(index))}
                        </div>
                    }

                    <h5 className='pe-5 d-flex text-dark mb-4 text-decoration-underline' >
                        <Col>
                        <FolderFill className='me-2' color={colors.yellow} />
                        {folder?.path || <Skeleton  width={100} />}
                        </Col>
                    </h5>
                    
                    {folder?.notes.length === 0 && folder.subFolderIds.length === 0 && <EmptyFolder /> }
                    <div className='col-12 d-flex flex-wrap align-items-center mb-2'>
                        {displayFilterButtons()}
                        {displayButtons()}
                        <SearchBar folder={folder} />
                    </div>
                    {displayFilesBar()}
                    {displayNoteLinks()}
                    {displaySubFolderLinks()}
                </div>
            </div>
        </Container>
    );
};