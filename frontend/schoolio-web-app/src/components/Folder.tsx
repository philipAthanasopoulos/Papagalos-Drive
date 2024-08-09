import React, { Component } from 'react';
import Note from './Note';
import axios from 'axios';
import {webApi} from '../env/env';
import { Button } from 'react-bootstrap';

class Folder {
    id: string;
    name: string;
    subFolders: Folder[];
    notes: Note[];

    constructor(id: string) {
        this.id = id;
        this.name = '';
        this.subFolders = [];
        this.notes = [];
    }
}

type Props = {
    id: string;
};

type State = {
    folder: Folder;
};

class FolderComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            folder: new Folder(props.id),
        };
    }

    fetchFolder = async (folderId:string) => {
        try {
            const response = await axios.get(`${webApi}/folder/${folderId}`);
            console.log(response.data);
            const { id, name, subFolders, notes } = response.data;
            this.setState({ folder: { id, name, subFolders, notes } });
            console.log(this.state.folder.subFolders);
        } catch (error) {
            console.error('Error loading folder:', error);
        }
    };

    componentDidMount() {
        if (this.props.id) {
            this.fetchFolder(this.props.id);
        }
    }

    render() {
        const { name, subFolders, notes } = this.state.folder;
        return (
            <div>
                <h1>Φάκελος: {name}</h1>
                {notes?.map((note, index) => (
                    <div key={index}>
                        <a href={`data:image/jpeg;base64,${note.file}`} target='_blank' rel='noopener noreferrer'>
                            {note.fileName}
                        </a>
                    </div>
                ))}
                {subFolders?.map((subFolder, index) => (
                    <div key={index}>
                        <Button variant='link' onClick={() => this.fetchFolder(subFolder.id)}>
                            📁{subFolder.name}
                        </Button>
                    </div>
                ))}
            </div>
        );
    }
}

export default FolderComponent;