export class NoteDTO {
    id: number;
    name: string;
    type: string;
    mongoId: string;
    uploadDate: Date;

    constructor(id: number, name: string, type: string, mongoId: string, uploadDate: any) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.mongoId = mongoId;
        this.uploadDate = uploadDate ? new Date(uploadDate) : new Date();
    }
}