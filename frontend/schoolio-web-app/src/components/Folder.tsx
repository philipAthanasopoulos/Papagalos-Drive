import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localApi } from '../env/env';
import { Button } from 'react-bootstrap';
import { FolderDTO } from './FolderDTO';

type Props = {
    id: number;
};

const FolderComponent: React.FC<Props> = ({ id }) => {
    const [folder, setFolder] = useState<FolderDTO>(new FolderDTO(id));
    const [base64Strings, setBase64Strings] = useState<string[]>([]);
    const [dataHasLoaded, setDataHasLoaded] = useState<boolean>(false);

    const fetchFolder = async (folderId: number) => {
        try {
            const response = await axios.get(`${localApi}/folder/${folderId}`);
            console.log(response.data);
            console.log("Got folder");
            const { id, name, subFolderIds, subFolderNames, noteBlobIds, noteNames } = response.data;
            setFolder({ id, name, subFolderIds, subFolderNames, noteBlobIds, noteNames });
            setDataHasLoaded(true);
        } catch (error) {
            console.error('Error loading folder:', error);
        }
    };

    useEffect(() => {
        fetchFolder(id);
    }, [id]);

    const renderSubFolders = (): React.ReactNode => {
        const { subFolderIds, subFolderNames } = folder;
        return subFolderNames?.map((name, index) => (
            <div key={index}>
                <Button variant='light' size='lg' onClick={() => fetchFolder(subFolderIds[index])}>
                    📁{name}
                </Button>
            </div>
        ));
    };
    
    async function fetchBlobData(blobId: string) {
        return await axios.get(`${localApi}/blob/${blobId}`);
    }

    const fetchBlobs = async () => {
        const blobIds = folder.noteBlobIds;
        const strings: string[] = [];
        const fetchPromises =  blobIds.map(async (blobId) => {
            try {
                const response = await fetchBlobData(blobId);
                strings.push(response.data.data);
            } catch (error) {
                console.error('Error loading blobs:', error);
            }
        });
        await Promise.all(fetchPromises);
        setBase64Strings(strings);
        setDataHasLoaded(true);
    }


    async function openFileInNewTab(index: number): Promise<void> {
        const response = fetchBlobData(folder.noteBlobIds[index]);
        await Promise.resolve(response);
        const base64String = (await response).data.data;    

        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`
                <html>
                    <head>
                        <title>File Viewer</title>
                    </head>
                    <body>
                        <embed src="data:application/pdf;base64,${base64String}" type="application/pdf" width="100%" height="100%" />
                    </body>
                </html>
            `);
            newWindow.document.close();
        }
    }

    const renderBlobs = (): React.ReactNode => {
        return (
            <>
                <div>
                    {folder.noteNames.map((name, index) => (
                        <div key={index}>
                            <Button variant='light' size='lg' onClick={() => openFileInNewTab(index)}>
                                📄{name}
                            </Button>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className='d-flex flex-column'>
            {dataHasLoaded && (
                <>
                    <h1>Φάκελος: {folder.name}</h1>
                    {renderBlobs()}
                    {renderSubFolders()}
                </>
            )}
        </div>
    );
};

export default FolderComponent;


