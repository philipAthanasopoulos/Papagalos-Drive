export class NoteDTODetailed {
    id: number;
    name: string;
    type: string;
    uploadDate: string;
    data: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uploadDate = data.uploadDate;
        this.data = data.data;
    }
}