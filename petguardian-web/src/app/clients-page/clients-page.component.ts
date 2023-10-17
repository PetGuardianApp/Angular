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
  }

  showData(user: ClientModel[]) {
    var uid = this.storageService.SessionGetStorage("uid");
    this.apiService.getClients(uid);
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
