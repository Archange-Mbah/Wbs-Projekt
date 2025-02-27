import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoteBook } from '../../models/notebook.model';
@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private apiUrl = 'http://localhost:8080/notebooks';

  constructor(private http: HttpClient) {}

  getNoteBooks(): Observable<NoteBook[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response) => 
        response.map(noteBook => new NoteBook(
          noteBook.id,
          noteBook.title,
          new Date(noteBook.createdAt), // Make sure to handle date conversion
          new Date(noteBook.updatedAt),
          noteBook.notes,  // Assuming `notes` is an array of note objects
          noteBook.owner   // Assuming `owner` is an object with `id`, `name`, `email`
        ))
      )
    );
  }

  getNotebook(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createNotebook(title: string): Observable<any> {
    return this.http.post(this.apiUrl, { title });
  }

  updateNotebook(id: string, title: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { title });
  }

  deleteNotebook(id: string): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
