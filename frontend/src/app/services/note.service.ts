import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Note } from '../../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8080/notebooks';

  constructor(private http: HttpClient) {}

  // Fetch notes for a specific notebook
  getNotes(notebookId: string): Observable<Note[]> {
    return this.http.get<any[]>(`${this.apiUrl}?notebookId=${notebookId}`).pipe(
      map((response) => 
        response.map(note => new Note(
          note.id,
          note.title,
          note.content,
          note.notebookId,
        ))
      )
    );
  }

  getNote(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createNote(notebookId: string, title: string, content: string): Observable<any> {
    return this.http.post(this.apiUrl, { notebookId, title, content });
  }

  updateNote(id: string, title: string, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { title, content });
  }

  deleteNote(id: string): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
