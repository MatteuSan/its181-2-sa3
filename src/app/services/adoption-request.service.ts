import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionRequest } from '../models/adoption-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { REST_API_URL } from '../constants/site';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {
  constructor(
    private http: HttpClient,
  ) { }

  getAdoptionRequests(): Observable<AdoptionRequest> {
    return this.http.get<AdoptionRequest>(`${REST_API_URL}/adoption-requests`);
  }

  getAdoptionRequest(id: number): Observable<AdoptionRequest> {
    return this.http.get<AdoptionRequest>(`${REST_API_URL}/adoption-requests/${id}`);
  }

  createAdoptionRequest(adoptionRequest: AdoptionRequest): Observable<AdoptionRequest> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AdoptionRequest>(`${ REST_API_URL }/adoption-requests`, adoptionRequest, { headers });
  }

  approveAdoptionRequest(id: number): Observable<AdoptionRequest> {
    return this.http.put<AdoptionRequest>(`${REST_API_URL}/adoption-requests/${id}`, { status: 'approved' });
  }

  removeAdoptionRequestApproval(id: number): Observable<AdoptionRequest> {
    return this.http.put<AdoptionRequest>(`${REST_API_URL}/adoption-requests/${id}`, { status: 'pending' });
  }

  deleteAdoptionRequest(id: number): Observable<AdoptionRequest> {
    return this.http.delete<AdoptionRequest>(`${REST_API_URL}/adoption-requests/${id}`);
  }
}
