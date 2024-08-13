import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localApi } from '../env/env';
import { FolderDTO } from './FolderDTO';
import { Link, useParams } from 'react-router-dom';


export const FolderComponent: React.FC = () => {
    const pathId= useParams<{ id: string }>().id;
    const id = Number(pathId);
    const [folder, setFolder] = useState<FolderDTO>(new FolderDTO(id));

    const fetchFolder = async (folderId: number) => {
        try {
            const response = await axios.get(`${localApi}/folder/${folderId}`);
            const folder: FolderDTO = response.data;
            setFolder(folder);
        } catch (error) {
            console.error('Error loading folder:', error);
        }
    };

    useEffect(() => {
        fetchFolder(id);
    }, [id]);

    const displaySubFolderLinks = (): React.ReactNode => {
        const { subFolderIds, subFolderNames } = folder;
        return subFolderNames?.map((name, index) => (
            <div key={index}>
                <Link to={`/folder/${subFolderIds[index]}`} className='btn btn-light btn-lg'>📁{name}</Link>
            </div>
        ));
    };

    const displayNoteLinks = (): React.ReactNode => {
        return (
            <div>
                {folder.noteNames.map((name, index) => (
                    <div key={index}>
                        <Link to={`/file/${folder.noteBlobIds[index]}`} className='btn btn-light btn-lg'>
                            📄{name}
                        </Link>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='d-flex flex-column'>
            <h1>Φάκελος: {folder.name}</h1>
            {displayNoteLinks()}
            {displaySubFolderLinks()}
        </div>
    );
};