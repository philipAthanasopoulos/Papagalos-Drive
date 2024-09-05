import { NoteDTO } from "../Note/NoteDTO";

export class FolderDTO {
    id: number;
    name: string;
    subFolderIds: number[];
    subFolderNames: string[];
    notes: NoteDTO[];
    path: string;

    constructor(id: number) {
        this.id = id;
        this.name = '';
        this.subFolderIds = [];
        this.subFolderNames = [];
        this.notes = [];
        this.path = "";
    }

    isEmpty(): boolean {
        return this.notes.length === 0 && this.subFolderIds.length === 0;
    }
}
