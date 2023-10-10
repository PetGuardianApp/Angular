import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(private afAuth: AngularFireAuth, private router:Router) {  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/'])
    })
    //setTimeout(() => { }, 500);
  }
}
