import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {FolderFill} from 'react-bootstrap-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {Link, useParams} from 'react-router-dom';
import colors from '../../colors';
import {fileIcons} from '../FileIcons';
import {NoteDTO} from '../Note/NoteDTO';
import EmptyFolder from './EmptyFolder';
import FileTypeFilterButton from './FileTypeFilterButton';
import {getFolderById} from "../../api/api";
import {FolderDetailedDTO} from "./FolderDetailedDTO";
import AddSubFolderButton from "./AddSubFolderButton";
import AddFileButton from "../Note/AddFileButton";
import {SearchBar} from "../Search/SearchBar";

export const FolderComponent: React.FC = () => {
    const pathId = useParams<{ id: string }>().id;
    const id = Number(pathId);
    const [folder, setFolder] = useState<FolderDetailedDTO>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedFileType, setSelectedFileType] = useState<string>("");

    useEffect(() => {
        const fetchFolder = async () => {
            try {
                const response = await getFolderById(id).then();
                setFolder(new FolderDetailedDTO(response));
                setSelectedFileType("All");
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        };
        fetchFolder();
    }, [id]);

    const displaySubFolderLinks = (): React.ReactNode => {
        if (!folder) return null;
        const {subFolders} = folder;

        if (selectedFileType === "All" || selectedFileType === "Folder")
            return subFolders?.map((subFolder, index) => (
                <div key={index}>
                    <hr/>
                    <Link to={`/folder/${subFolder.id}`} className='btn btn-light btn-lg'>
                        <FolderFill color={colors.carrot_orange}/> {subFolder.name}
                    </Link>
                </div>
            ));
    };

    const displayNoteLinks = (): React.ReactNode => {
        let notesToDisplay: NoteDTO[] = folder?.notes.filter((note) => note.type.toLowerCase() === selectedFileType) || [];
        if (selectedFileType === "All") notesToDisplay = folder?.notes || [];
        return (
            <div>
                {notesToDisplay.map((note, index) => (
                    <div key={index}>
                        <hr/>
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
        return (
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
        return (
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
        return (
            <Container>
                <Row>
                    <Col className='d-flex'>
                        <div className='me-5'>
                            <AddSubFolderButton folder={folder}/>
                        </div>
                        <div className='me-5'>
                            <AddFileButton folder={folder}/>
                        </div>
                        {/*<div className='me-5'>*/}
                        {/*    <EditFolderButton folder={folder} setFolder={setFolder}/>*/}
                        {/*</div>*/}
                    </Col>
                </Row>
            </Container>
        );
    }

    const displayLoadingSkeleton = (index: number): React.ReactNode => {
        return (
            <div>
                <hr/>
                <div className='d-flex mb-4 mt-4'>
                    <Skeleton key={index} height={30} width={15} className='ms-3 me-1'/>
                    <Skeleton key={index} height={30} width={100}/>
                </div>
            </div>
        )
    }

    return (
        <Container className='mb-5'>
            <Row className='pt-5'>
                <Col xs={12}>
                    {isLoading &&
                        <div>
                            {Array.from({length: 30}).map((_, index) => displayLoadingSkeleton(index))}
                        </div>
                    }

                    <h5 className='pe-5 d-flex text-dark mb-4 '>
                        <Col>
                            <FolderFill className='me-2' color={colors.carrot_orange}/>
                            &gt;
                            <span className="text-decoration-underline">
                                {folder?.name || <Skeleton width={100}/>}
                            </span>
                        </Col>
                    </h5>
                    {folder &&
                        <>
                            <Row className='d-flex flex-wrap align-items-center mb-2'>
                                <Col xs={12} md={4} className='mb-2 mb-md-0'>
                                    {displayFilterButtons()}
                                </Col>
                                <Col xs={12} md={4} className='mb-2 mb-md-0'>
                                    {displayButtons()}
                                </Col>
                                <Col xs={12} md={4}>
                                    <SearchBar folder={folder}/>
                                </Col>
                            </Row>
                            {folder && displayFilesBar()}
                            {displayNoteLinks()}
                            {displaySubFolderLinks()}
                        </>
                    }

                    {folder?.isEmpty() && <EmptyFolder/>}
                </Col>
            </Row>
        </Container>
    );
};