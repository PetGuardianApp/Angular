import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  clients: any[] = [];
  constructor(public apiService: ApiService, private storageService: StorageService, private router: Router) {
    this.showData();
  }

  redirectPetPage(id: string) {
    this.router.navigate(['chat-page'], {
      queryParams: { clientId: id }
    });
  }

  showData(): void {
    this.apiService.getClients(this.storageService.SessionGetStorage("uid")).then((clientsArray) => {
      this.clients = clientsArray;
      console.log(this.clients);
    })
  }
}
