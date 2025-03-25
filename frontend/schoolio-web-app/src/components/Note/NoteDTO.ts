export class NoteDTO {
    id: number;
    name: string;
    type: string;
    uploadDate: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uploadDate = data.uploadDate;
    }
}