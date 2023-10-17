import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../models/client.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://petguardian-api.uc.r.appspot.com/'
  private temp!: Observable<ClientModel[]>;
  constructor( private http: HttpClient, private storageService:StorageService) { 

   }



   getClients(uid:String){
   
    var entrycount = 0;
    this.http.get<ClientModel[]>(this.apiUrl+'vet/findClients/'+uid).forEach(element => {
    element.forEach(entry => {
        this.storageService.SessionAddStorage("client"+entrycount.toString(),entry)
        entrycount++;
    })
   });

  
   }

}
