import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ClientModel } from '../models/client.model';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent {
  constructor(private router: Router, private apiService: ApiService, private storageService: StorageService) {
    this.showData();
  }

  showData() {
    var uid = this.storageService.SessionGetStorage("uid");
    this.apiService.getClients(uid).then(function (clientsArray) {
      const clientNameElement = document.getElementById("clientName1");
      const client:ClientModel = clientsArray[0];

      if (clientNameElement && client.name !== undefined) {
        clientNameElement.innerHTML = client.name + " " +  client.surnames;
      }

      // CLient 2
      const clientNameElement2 = document.getElementById("clientName2");
      const client2:ClientModel = clientsArray[1];

      if (clientNameElement2 && client2.name !== undefined) {
        clientNameElement2.innerHTML = client2.name + " " +  client2.surnames;
      }

    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      alert('Searching client...');
      this.router.navigate(['clients/client'], {
        queryParams: { uid: '' }
      });
    }
  }

  redirectClientPage(event: Event) {
    this.router.navigate(['clients/client'], {
      queryParams: { uid: '' }
    });
  }
}
