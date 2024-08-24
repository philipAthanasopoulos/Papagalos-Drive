import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { webApi } from '../env/env';
import { FolderDTO } from './FolderDTO';
import { Link, useParams } from 'react-router-dom';
import AddSubFolderButton from './AddSubFolderButton';
import AddFileButton from './AddFileButton';
import { FileEarmarkRichtext, FolderFill } from 'react-bootstrap-icons';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const FolderComponent: React.FC = () => {
    const pathId= useParams<{ id: string }>().id;
    const id = Number(pathId);
    const [folder, setFolder] = useState<FolderDTO>();

    const fetchFolder = async () => {
        try {
            const response = await axios.get(`${webApi}/folder/${id}`);
            const folder: FolderDTO = response.data;
            setFolder(folder);
            
        } catch (error) {
            console.error('Error loading folder:', error);
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
                    <FolderFill color='orange' /> {name}
                </Link>
            </div>
        ));
    };

    const displayNoteLinks = (): React.ReactNode => {
        if (!folder) return null;
        return (
            <div>
                {folder.noteNames.map((name, index) => (
                    <div key={index}>
                    <hr />
                        <Link to={`/file/${folder.noteBlobIds[index]}`} className='btn btn-light btn-lg text-left'>
                            <FileEarmarkRichtext color='green'/> {name}
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
                    <Skeleton key={index} height={30} width={20} className='me-2'/>
                    <Skeleton key={index} height={30} width={100} />
                </div>
            </div>
        )
    }

    return (
        <div className='d-flex flex-column pt-5'>
            <div className='d-flex '>
                <h1 className='pe-5 d-flex'>
                    Φάκελος: {folder?.name || <Skeleton className='btn btn-light btn-lg text-left'/>}
                </h1>
                {displayButtons()}
            </div>
            <div className='pt-5'>
                {displayNoteLinks() || 
                    <div>
                        {Array.from({ length: 30 }).map((_, index) => (
                            displayLoadingSkeleton(index)
                        ))}
                    </div>
                }
                {displaySubFolderLinks()}
            </div>
        </div>
    );
};