export class NewsArticleDTO {
    id: number;
    title: string;
    content: string;
    postDate: string;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.postDate = data.postDate;
    }
}