import { NoteDTO } from "../Note/NoteDTO";

export class FolderDTO {
    id: number;
    name: string;
    subFolderIds: number[];
    subFolderNames: string[];
    notes: NoteDTO[];

    constructor(id: number) {
        this.id = id;
        this.name = '';
        this.subFolderIds = [];
        this.subFolderNames = [];
        this.notes = [];
    }

    isEmpty(): boolean {
        return ( (this.subFolderIds.length === 0 || !this.subFolderIds) && this.notes.length === 0 || !this.notes);
    }
}
