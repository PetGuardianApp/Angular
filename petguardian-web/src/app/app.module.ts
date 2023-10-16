import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';



import { environment } from '../enviroments/enviroments';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SidenavLinkComponent } from './sidenav-link/sidenav-link.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ControllerAppointmentsComponent } from './appointments/controller-appointments/controller-appointments.component';
import { VisualAppointmentsComponent } from './appointments/visual-appointments/visual-appointments.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { ClientsPageComponent } from './clients-page/clients-page.component';
import { HeaderComponent } from './header/header.component';
import { ClientSinglePageComponent } from './client-single-page/client-single-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    ControllerAppointmentsComponent,
    VisualAppointmentsComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    SidenavLinkComponent,
    ClientsPageComponent,
    HeaderComponent,
    ClientSinglePageComponent,
    
  ],
  imports: [ 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    CommonModule,
    FlatpickrModule.forRoot(),
    NgbModalModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
