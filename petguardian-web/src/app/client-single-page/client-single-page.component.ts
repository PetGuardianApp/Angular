import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ClientModel } from '../models/client.model';
import { PetModel } from '../models/pet.model';

@Component({
  selector: 'app-client-single-page',
  templateUrl: './client-single-page.component.html',
  styleUrls: ['./client-single-page.component.css']
})
export class ClientSinglePageComponent {
  public clientInfo: ClientModel;
  public clientPets: PetModel[];

  constructor(private router: Router, private apiService: ApiService) {
    const urlParams = new URLSearchParams(window.location.search);
    this.showClientData(urlParams.get('uid'));
    this.clientInfo = new ClientModel;
    this.clientPets = [];
  }

  showClientData(uid: string | null) {
    if (uid != null) {
      this.apiService.getSingleClient(uid).then((clientData) => {
        this.clientInfo = clientData;
      });
      this.apiService.getClientPets(uid).then((pets) => {
        this.clientPets = pets;
      });
    }
  }

  redirectPetPage(userId: string | undefined) {
    this.router.navigate(['clients/pet'], {
      queryParams: { petId:userId }
    });
  }
}
