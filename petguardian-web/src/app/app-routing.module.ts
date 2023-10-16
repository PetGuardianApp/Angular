import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientSinglePageComponent } from './client-single-page/client-single-page.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'clients', component: ClientsPageComponent},
  {path: 'clients/client', component: ClientSinglePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
