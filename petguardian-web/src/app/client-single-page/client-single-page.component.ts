import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-client-single-page',
  templateUrl: './client-single-page.component.html',
  styleUrls: ['./client-single-page.component.css']
})
export class ClientSinglePageComponent {
  
  constructor(private router: Router, private apiService: ApiService) {
  }
  
  redirectPetPage(event: Event) {
    this.router.navigate(['clients/pet'], {
      queryParams: { uid: '1234' }
    });
  }
}
