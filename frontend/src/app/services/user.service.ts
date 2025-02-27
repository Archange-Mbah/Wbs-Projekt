import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http:HttpClient) { }


  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, userData);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);  // DELETE request to remove a user by ID
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }
}
