import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'http://localhost:3000';  // The base URL of your API

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  // Login
  
  login(email: string, password1: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password1 }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.userName);
        this.loggedIn.next(true);
      })
    );
  }  
  

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  
  // Registration
  register(username: string, email: string, password1: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password1 })
      .pipe(
        tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.userName);
        this.loggedIn.next(true);
        catchError(error => throwError(() => new Error(error.error.message || "Registration failed due to server error")))
        })
      );
  }
  

  private setSession(authResult: any): void {
    localStorage.setItem('token', authResult.token);
    this.loggedIn.next(true);
    this.router.navigate(['/dashboard']);
  }

  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
