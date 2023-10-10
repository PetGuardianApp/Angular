import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent  {

  isLoggedIn$: Observable<boolean>;

  constructor(private storageService: StorageService) {
    this.isLoggedIn$ = this.storageService.isLoggedIn;
   }

  

}
