import React, { Component } from 'react'
import Note from './Note'

type Props = {
    id:string,
    name:string,
    parentFolder:Folder,
    subFolders:Folder[],
    notes:Note[],
}



class Folder extends Component<Props> {
    id:string;
    name:string;
    parentFolder:Folder;
    subFolders:Folder[];
    notes:Note[];
    constructor(props:Props) {
        super(props);
        this.id = props.id;
        this.name = props.name;
        this.parentFolder = props.parentFolder;
        this.subFolders = props.subFolders;
        this.notes = props.notes;
    }

    render() {
        return (
            <div>
                <h1>{this.props.id}</h1>
                <h1>{this.props.name}</h1>
                {this.props.notes && this.props.notes.map((note,index) => (
                <div key={index}>
                    <a href={`data:image/jpeg;base64,${note.file}`} target='_blank'>
                    {note.fileName}
                    </a>
                </div>
                ))}
            </div>
        )
    }
}

export default Folder;