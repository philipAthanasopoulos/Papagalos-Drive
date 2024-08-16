import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { webApi } from '../env/env';
import { FolderDTO } from './FolderDTO';
import { Link, useParams } from 'react-router-dom';
import papaFolder from '../images/papa-folder.svg';

export const FolderComponent: React.FC = () => {
    const pathId= useParams<{ id: string }>().id;
    const id = Number(pathId);
    const [folder, setFolder] = useState<FolderDTO>(new FolderDTO(id));

    const fetchFolder = async (folderId: number) => {
        try {
            const response = await axios.get(`${webApi}/folder/${folderId}`);
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
        if (!folder || !folder.subFolderNames || !folder.subFolderIds) return null;
        const { subFolderIds, subFolderNames } = folder;
        return subFolderNames?.map((name, index) => (
            <div key={index}>
                <Link to={`/folder/${subFolderIds[index]}`} className='btn btn-light btn-lg'>
                <img src={papaFolder} alt="" />
                {name}</Link>
            </div>
        ));
    };

    const displayNoteLinks = (): React.ReactNode => {
        if (!folder || !folder.noteNames || !folder.noteBlobIds) return null;
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