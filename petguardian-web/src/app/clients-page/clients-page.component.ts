import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent {
  subscription: Subscription;

  constructor(private storageService: StorageService,
              private router:Router){
    this.subscription = this.storageService.isLoggedIn
      .subscribe(data => {
        if(data==false){
          this.router.navigate(['/']);
        }
      });
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      alert('Searching client...');
    }
  }
}
