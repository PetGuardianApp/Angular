import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ClientModel } from '../models/client.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css'],
})
export class ClientsPageComponent {
  public clientsArray: ClientModel[];
  public contentIsLoad:boolean;

  constructor(private router: Router, private apiService: ApiService, private storageService: StorageService) {
    this.showData();
    this.clientsArray = [];
    this.contentIsLoad = true;
  }

  showData() {
    var uid = this.storageService.SessionGetStorage("uid");

    this.apiService.getClients(uid).then((clientsArray) => {
      this.clientsArray = clientsArray;
      this.contentIsLoad = false;
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

  redirectClientPage(userId: string | undefined) {
    this.router.navigate(['clients/client'], {
      queryParams: { uid: userId }
    });
  }
}
