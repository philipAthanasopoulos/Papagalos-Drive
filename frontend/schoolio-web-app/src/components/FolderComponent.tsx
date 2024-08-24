import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { webApi } from '../env/env';
import { FolderDTO } from './FolderDTO';
import { Link, useParams } from 'react-router-dom';
import papaFolder from '../images/papa-folder.svg';
import AddSubFolderButton from './AddSubFolderButton';
import AddFileButton from './AddFileButton';
import { FileEarmarkRichtext, FolderFill } from 'react-bootstrap-icons';

export const FolderComponent: React.FC = () => {
    const pathId= useParams<{ id: string }>().id;
    const id = Number(pathId);
    const [folder, setFolder] = useState<FolderDTO>(new FolderDTO(id));

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
        return (
            <div>
                {folder.noteNames.map((name, index) => (
                    <div key={index}>
                    <hr />
                        <Link to={`/file/${folder.noteBlobIds[index]}`} className='btn btn-light btn-lg'>
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

    return (
        <div className='d-flex flex-column pt-5'>
            <div className='d-flex '>
                <h1 className='pe-5'>
                    Φάκελος: {folder.name}
                </h1>
                 {displayButtons()}
            </div>
            <div className='pt-5'>
                {displayNoteLinks()}
                {displaySubFolderLinks()}
            </div>
        </div>
    );
};