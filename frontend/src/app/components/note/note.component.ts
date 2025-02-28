import { Component, Input } from '@angular/core';
import { Note } from '../../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
    selector: 'app-note',
    standalone  : true,
    imports: [],
    templateUrl: './note.component.html',
    styleUrl: './note.component.scss'
})
export class NoteComponent {

  @Input() note!: Note;

  constructor(
    private service: NoteService
  ) { }
}
