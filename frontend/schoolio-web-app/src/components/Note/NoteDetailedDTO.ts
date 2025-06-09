export class NoteDTODetailed {
    id: number;
    name: string;
    type: string;
    uploadDate: Date;
    data: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uploadDate = data.uploadDate;
        this.data = data.data;
    }
}