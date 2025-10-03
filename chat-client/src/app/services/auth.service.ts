import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5099/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  private loggedIn = false;

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }


  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string, username: string }>(`${this.apiUrl}/login`, credentials)
    .pipe(
      tap(response => {
        this.saveToken(response.token);
        this.setLoggedIn(true);
        this.saveUsername(response.username);
      })
    );
  }

  register(credentials: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, credentials)
  }  
  
  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  saveUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getToken(): string | null {
  return localStorage.getItem('auth_token');
  }
}
