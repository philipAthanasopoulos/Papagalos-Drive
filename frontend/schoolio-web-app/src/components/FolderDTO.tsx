export class NoteDTO {
    id: number;
    name: string;
    type: string;
    mongoId: string;

    constructor(id: number, name: string, type: string, mongoId: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.mongoId = mongoId;
    }
}


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
