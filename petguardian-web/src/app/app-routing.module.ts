import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientSinglePageComponent } from './client-single-page/client-single-page.component';
import { PetSinglePageComponent } from './pet-single-page/pet-single-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'clients', component: ClientsPageComponent},
  {path: 'clients/client', component: ClientSinglePageComponent},
  {path: 'clients/pet', component: PetSinglePageComponent},
  {path: 'chat-page', component: ChatPageComponent},
  {path: 'chat-list', component: ChatListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
