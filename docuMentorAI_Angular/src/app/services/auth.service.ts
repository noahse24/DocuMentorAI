import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'http://localhost:3000/api';  // The base URL of your API

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  
  // If you plan to implement registration:
  register(user: { email: string; password: string; username?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
