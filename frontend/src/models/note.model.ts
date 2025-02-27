
export class Note{
    constructor(
        private id: string,
        public title: string,
        private content: string,
        private notebookId: string
    ){}

    getId(): string{
        return this.id;
    }
    getTitle(): string{
        return this.title;
    }
    getContent(): string{
        return this.content;
    }
    getNotebookId(): string{
        return this.notebookId;
    }
}