

export class ArticleDTO {
    id:number;
    title:string;
    content:string;
    postDate:Date;

    public constructor(data: any) {
        this.id=data.id;
        this.title=data.title;
        this.content=data.content;
        this.postDate=new Date(data.postDate);
    }
}
