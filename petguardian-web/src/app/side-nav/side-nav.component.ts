import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  isLoggedIn$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private storageService: StorageService) {
    this.isLoggedIn$ = this.storageService.isLoggedIn;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.storageService.isLoggedNext(false);
      this.router.navigate(['/'])
    })
    //setTimeout(() => { }, 500);
  }
}
