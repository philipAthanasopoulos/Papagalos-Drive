import { NoteDTO } from "../Note/NoteDTO";


export class FolderDTO {
    id: number;
    name: string;
    subFolderIds: number[];
    subFolderNames: string[];
    notes: NoteDTO[];
    path: string;

    public constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.subFolderIds = data.subFolderIds;
        this.subFolderNames = data.subFolderNames;
        this.notes = data.notes;
        this.path = data.path;
    }

    public isEmpty():boolean {
        return this.notes.length === 0 && this.subFolderIds.length === 0;
    }
}
