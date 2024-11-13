import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REST_API_URL } from '../constants/site';
import { Observable } from 'rxjs';
import { Dog } from '../models/dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  constructor(
    private http: HttpClient
  ) {}

  getDogs(): Observable<Dog> {
    return this.http.get<Dog>(`${REST_API_URL}/dogs`);
  }

  getDog(id: number): Observable<Dog> {
    return this.http.get<Dog>(`${REST_API_URL}/dogs/${id}`);
  }

  createDog(dog: Dog): Observable<Dog> {
    return this.http.post<Dog>(`${REST_API_URL}/dogs`, dog);
  }

  updateDog(id: number, dog: Dog): Observable<Dog> {
    return this.http.put<Dog>(`${REST_API_URL}/dogs/${id}`, dog);
  }

  deleteDog(id: number): Observable<Dog> {
    return this.http.delete<Dog>(`${REST_API_URL}/dogs/${id}`);
  }

}
