class NoteObj {
    private createdTime: string;
    private title: string;
    private content: Array<RowObj>;
    constructor(title: string) {
        this.createdTime = (new Date()).toLocaleString();
        this.title = title;
        let content: RowObj[] = [];
        this.content = content;
    }
    public setTime: (time: string) => void = (time) => {
        this.createdTime = time;
    }
    public setTitle: (title: string) => void = (title) => {
        this.title = title;
    }
    public getTime: () => string = () => {
        return this.createdTime;
    }
    public getTitle: () => string = () => {
        return this.title;
    }
    public getContent: () => RowObj[] = () => {
        return this.content;
    }
    public updateContent: (content: Array<RowObj>) => void = (content) => {
        this.content = content;
    }
    public clearContent: () => void = () => {
        let content: RowObj[] = [];
        this.content = content;
    }
    public addRow: (line: number) => void = (line) => {
        this.content.push(new RowObj(line, ''));
    }
    public setRows: (rows: Array<RowObj>) => void = (rows) => {
        this.content = rows;
    }
    public modifyRow: (line: number, row: RowObj) => void = (line, row) => {
        this.content[line - 1] = row;
    }
    public removeRow: (line: number) => void = (line) => {
        this.content.splice(line, line);
    }
}

class RowObj {
    private line: number;
    private words: string;
    // private image: string;
    constructor(line: number, words: string) {
        this.line = line;
        this.words = words;
    }
    public getLine: () => number = () => {
        return this.line;
    }
    public setWords: (words: string) => void = (words) => {
        this.words = words;
    }
    // public setImage: (image: string) => void = (image) => {
    //     this.image = image;
    // }
    // public setBinary: (binary: File) => void = (binary) => {
    //     this.binary = binary;
    // }
    public getWords: () => string = () => {
        return this.words;
    }
    // public getImage: () => string = () => {
    //     return this.image;
    // }
}

export { NoteObj, RowObj };
