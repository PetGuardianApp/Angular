import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://petguardian-api.uc.r.appspot.com/'
  private temp!: Observable<ClientModel[]>;
  constructor(private http: HttpClient) {

  }

  getAllClients() {
    this.http.get<ClientModel[]>(this.apiUrl + '/client/all').forEach(data => {
      return data;
    });
  }

}
