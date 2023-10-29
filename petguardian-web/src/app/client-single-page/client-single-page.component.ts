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

        if (clientData.name == "Alejandra") {
          clientData.photoSrc = "/assets/img/usrProfImage2.jpg";
          clientData.resume = "An animal lover with an unconditional love for my four-legged pet. Over the years, I have had the privilege of sharing my life with dogs, cats, birds, and other adorable companions.    "
        } else {
          clientData.photoSrc = "/assets/img/userProfileImage.jpg";
          clientData.resume = "An animal lover with an unconditional love for my four-legged pets. Over the years, I have had the privilege of sharing my life with dogs, cats, birds, and other adorable companions."
        }
      });
      this.apiService.getClientPets(uid).then((pets) => {
        this.clientPets = pets;

        for (let i = 0; i < pets.length; i++) {
          if (pets[i].name == "Toby") {
            pets[i].profile_image = "/assets/img/dogImage1.jpg";
          } else if (pets[i].name == "Dobby") {
            pets[i].profile_image = "/assets/img/dogImage2.jpg";
          } else if (pets[i].name == "Darwin") {
            pets[i].profile_image = "/assets/img/catImage.avif";
          }
        }
      });
    }
  }

  redirectPetPage(userId: string | undefined) {
    this.router.navigate(['clients/pet'], {
      queryParams: { petId: userId }
    });
  }
}
