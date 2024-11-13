import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REST_API_URL } from '../constants/site';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${REST_API_URL}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${REST_API_URL}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${REST_API_URL}/users`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${REST_API_URL}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${REST_API_URL}/users/${id}`);
  }
}
