import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../services/note.service';
import { NoteBook } from '../../models/notebook.model';
import { NoteComponent } from "../note/note.component";

@Component({
    selector: 'app-notebook',
    standalone  : true,
    imports: [NoteComponent],
    templateUrl: './notebook.component.html',
    styleUrl: './notebook.component.scss'
})
export class NotebookComponent  implements OnInit {

  @Input() notebook!:NoteBook;

  notes!:Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    // Use the notebook's getter method to get the ID
    const notebookId: string = this.notebook.getId();
    this.noteService.getNotes(notebookId).subscribe(notes => {
      this.notes = notes;
    });

  
}
}
