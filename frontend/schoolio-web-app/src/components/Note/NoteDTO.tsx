export class NoteDTO {
    id: number;
    name: string;
    type: string;
    mongoId: string;
    uploadDate: Date;
    path: string;

    constructor(id: number, name: string, type: string, mongoId: string, uploadDate: any, path:string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.mongoId = mongoId;
        this.uploadDate = uploadDate ? new Date(uploadDate) : new Date();
        this.path=path;
    }
}