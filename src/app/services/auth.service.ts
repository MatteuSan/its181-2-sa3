import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { REST_API_URL } from '../constants/site';
import { Router } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { SafeStorageService } from './safe-storage.service';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: SafeStorageService,
    private userService: UserService
  ) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });
    localStorage.setItem('authToken', btoa(`${username}:${password}`));
    return this.http.get(`${REST_API_URL}/login`, { headers, responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAuthToken(): string | null {
    return this.storage.getItem('authToken');
  }

  getCurrentUser(): Observable<any> {
    const token = this.getAuthToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Basic ${token}` })
      : new HttpHeaders();

    return this.http.get(`http://localhost:8080/current-user`, { headers });
  }

  getCurrentUserInformation(): Observable<User> {
    return this.getCurrentUser().pipe(
      switchMap((user: any) => {
        return this.userService.getUsers().pipe(
          map((users: User[]) => {
            return users.filter((u: User) => u.email === user.username)[0];
          })
        );
      })
    );
  }

  getCurrentUserRole(): string {
    let role: string = '';
    this.getCurrentUserInformation().subscribe((user: User) => role = user.type);
    return role;
  }
}
