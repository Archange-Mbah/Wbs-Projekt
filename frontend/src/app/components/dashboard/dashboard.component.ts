import { Component, OnInit } from '@angular/core';
import { NoteBook } from '../../../models/notebook.model';
import { NotebookService } from '../../services/notebooks.service';
import { NotebookComponent } from '../notebook/notebook.component';

@Component({
    selector: 'app-dashboard',
    standalone  : true,
    imports: [NotebookComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  notebooks!:NoteBook[]

  constructor(private service:NotebookService) { }

  ngOnInit(): void {
    this.service.getNoteBooks().subscribe(notebooks => this.notebooks = notebooks);
  }
}
