import { FolderDTO } from './FolderDTO';
import {NoteDTO} from "../Note/NoteDTO";

export class FolderDetailedDTO {
    id: number;
    name: string;
    parentFolder: FolderDTO | null;
    subFolders: FolderDTO[];
    notes: NoteDTO[];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.parentFolder = data?.parentFolder ? new FolderDTO(data.parentFolder) : null;
        this.subFolders = data.subFolders.map((subFolder: any) => new FolderDTO(subFolder));
        this.notes = data.notes.map((note: any) => new NoteDTO(note));
    }

    isEmpty(): boolean {
        return this.subFolders.length == 0 && this.notes.length == 0;
    }
}