import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { webApi } from '../../env/env';
import { FolderDTO } from './FolderDTO';
import { Link, useParams } from 'react-router-dom';
import AddSubFolderButton from '../AddSubFolderButton';
import AddFileButton from '../AddFileButton';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import EmptyFolder from './EmptyFolder';
import { SearchBar } from '../SearchBar';
import colors from '../../colors';
import { FileText, FiletypeDoc, FiletypeDocx, FiletypeGif, FiletypeJpg, FiletypeMp3, FiletypeMp4, FiletypePdf, FiletypePng, FiletypePptx, FiletypeTxt, FiletypeWav, FiletypeXls, FiletypeXlsx, FileZip, FolderFill } from 'react-bootstrap-icons';

export const FolderComponent: React.FC = () => {
    const pathId= useParams<{ id: string }>().id;
    const id = Number(pathId);
    const [folder, setFolder] = useState<FolderDTO>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchFolder = async () => {
        try {
            const response = await axios.get(`${webApi}/folder/${id}`);
            const folder: FolderDTO = response.data;
            setFolder(folder);
            setIsLoading(false)
        } catch (error) {
            console.error('Error loading folder:', error);
            fetchFolder();
        }
    };

    useEffect(() => {
        fetchFolder();
        console.log('FolderComponent mounted');
    }, [id]);

    const displaySubFolderLinks = (): React.ReactNode => {
        if (!folder) return null;
        const { subFolderIds, subFolderNames } = folder;
        return subFolderNames?.map((name, index) => (
            <div key={index}>
                <hr />
                <Link to={`/folder/${subFolderIds[index]}`} className='btn btn-light btn-lg'>
                    <FolderFill color={colors.yellow} /> {name}
                </Link>
            </div>
        ));
    };

    const fileIconMapping: { [key: string]: React.ReactNode } = {
        pdf: <FiletypePdf color={colors.red} />,
        doc: <FiletypeDoc color={colors.tealBlue} />,
        docx: <FiletypeDocx color={colors.tealBlue} />,
        xls: <FiletypeXls color={colors.green} />,
        xlsx: <FiletypeXlsx color={colors.green} />,
        ppt: <FiletypePdf color={colors.red} />,
        pptx: <FiletypePptx color={colors.red} />,
        txt: <FiletypePptx color={colors.darkGray} />,
        csv: <FiletypeTxt color={colors.darkGray} />,
        jpeg: <FiletypeJpg color={colors.yellow} />,
        jpg: <FiletypeJpg color={colors.yellow} />,
        png: <FiletypePng color={colors.yellow} />,
        gif: <FiletypeGif color={colors.yellow} />,
        mp4: <FiletypeMp4 color={colors.yellow} />,
        mp3: <FiletypeMp3 color={colors.yellow} />,
        wav: <FiletypeWav color={colors.yellow} />,
        zip: <FileZip color={colors.brownishGray} />,
        rar: <FileZip color={colors.brownishGray} />
    };

    const getFileIcon = (extension: string): React.ReactNode => {
        return fileIconMapping[extension.toLowerCase()] || <FileText />;
    };

    const displayNoteLinks = (): React.ReactNode => {
        if (!folder) return null;
        return (
            <div>
                {folder.notes.map((note, index) => (
                    <div key={index}>
                    <hr />
                        <Link to={`/note/${note.id}`} className='btn btn-light btn-lg'>
                            {getFileIcon(note.type)}
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
        <div className='container pt-5'>
            <div className='row'>
                <div className='col-12 d-flex flex-wrap'>
                    <h1 className='pe-5 d-flex'>
                        Φάκελος: {folder?.name || <Skeleton  width={100} />}
                    </h1>
                    {displayButtons()}
                    <SearchBar folder={folder} />
                </div>
            </div>
            <div>
            </div>
            <div className='row pt-5'>
                <div className='col-12'>
                    {isLoading && <div>
                            {Array.from({ length: 30 }).map((_, index) => displayLoadingSkeleton(index))}
                        </div>}

                    {folder?.isEmpty ? <EmptyFolder /> :
                    (
                        <>
                            {displayNoteLinks()}
                            {displaySubFolderLinks()}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};