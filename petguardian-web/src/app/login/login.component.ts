import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../services/firebase-error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from '../services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginUser: FormGroup;
  subscription: Subscription;


  constructor(private fb:FormBuilder, private afAuth: AngularFireAuth, private router: Router,
     private fireBaseErrorService: FirebaseErrorService, private toastr:ToastrService,private storageService:StorageService){
      this.loginUser = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',Validators.required]
      })


      this.subscription = this.storageService.isLoggedIn
      .subscribe(data => {
        if(data==true){
          this.router.navigate(['dashboard']);
        }
      });
  }

  login(){
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.afAuth.signInWithEmailAndPassword(email,password).then((user) => { //Realitza login
      this.storageService.isLoggedNext(true);
      this.router.navigate(['dashboard'])
      
    }).catch((error) => {
      
      this.toastr.error(this.fireBaseErrorService.firebaseError(error.code),'Error');
    })
    
  }


}
