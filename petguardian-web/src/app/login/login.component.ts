import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../services/firebase-error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginUser: FormGroup;


  constructor(private fb:FormBuilder, private afAuth: AngularFireAuth, private router: Router,
     private fireBaseErrorService: FirebaseErrorService, private toastr:ToastrService){
      this.loginUser = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',Validators.required]
      })
  }

  login(){
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.afAuth.signInWithEmailAndPassword(email,password).then((user) => { //Realitza login
      this.router.navigate(['dashboard'])
      
    }).catch((error) => {
      
      this.toastr.error(this.fireBaseErrorService.firebaseError(error.code),'Error');
    })
    
  }


}
