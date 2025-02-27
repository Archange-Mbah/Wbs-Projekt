import { NoteBook } from './notebook.model';

export class User{
    
    constructor(
        protected id: string,
        protected firstName: string,
        protected lastName: string,
        protected email: string,
        protected password: string,
        protected notebooks: NoteBook[]
    ){}
}