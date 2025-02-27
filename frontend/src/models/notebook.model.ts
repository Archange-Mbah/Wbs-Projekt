import { Note } from './note.model';
import { User } from './user.model';

export class NoteBook {
  constructor(
    protected id: string,
    public title: string, 
    protected createdAt: Date,
    protected updatedAt: Date,
    protected notes: Note[],
    protected owner: User
  ) {}

     getId(): string {
        return this.id;
    }
    getTitle(): string {
        return this.title;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date {
        return this.updatedAt;
    }
    getNotes(): Note[] {
        return this.notes;
    }
}