import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ClientModel } from '../models/client.model';
import { StorageService } from 'src/app/services/storage.service';
import { PetModel } from '../models/pet.model';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { VetModel } from '../models/vet.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  contentIsLoading: boolean = true;

  constructor(private router: Router, private apiService: ApiService,private storageService: StorageService) {
    this.showData();
    this.vet = new VetModel;
    this.petsArray = [];
    this.clientAppointments = []; 
    this.ifvisit = false;
    this.isTodayVisits = [];
    this.VisitPet = new PetModel;

  }
  currentDate: Date = new Date();
  public vet: VetModel;
  public petsArray: PetModel[];
  public clientAppointments: AppointmentModel[];
  public ifvisit: Boolean;
  public isTodayVisits: string[];
  public VisitPet: PetModel;

  ngOnInit(): void {
  }

  formatStartDate(inputDate: string): string {
    // Use a regular expression to capture the date components
    const dateRegex: RegExp = /(\d{2})(\d{2})(\d{4})_(\d{2}):(\d{2})/;
    // Match the regular expression and capture groups
    const match: RegExpMatchArray | null = inputDate.match(dateRegex);

    if (match) {
      // Extract the captured groups for hour, min
      const hour: string = match[4];
      const min: string = match[5];

      // Format the date as "ddmmyyyy"
      const formattedStartDate: string = `${hour}:${min}`;
      return formattedStartDate;
    } else {
      return '';
    }
  }

  formatDate(inputDate: string): string {
    // Use a regular expression to capture the date components
    const dateRegex: RegExp = /(\d{2})(\d{2})(\d{4})_(\d{2}):(\d{2})/;
    // Match the regular expression and capture groups
    const match: RegExpMatchArray | null = inputDate.match(dateRegex);

    if (match) {
      // Extract the captured groups for day, month, and year
      const day: string = match[1];
      const month: string = match[2];
      const year: string = match[3];

      // Format the date as "ddmmyyyy"
      const formattedDate: string = `${day}${month}${year}`;
      return formattedDate;
    } else {
      return '';
    }
  }

  isTodayVisit(visit_date: string): Boolean {
    const day = this.currentDate.getDate().toString().padStart(2, '0'); // Ensure a leading zero if needed
    const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = this.currentDate.getFullYear().toString();
    const formattedDate = `${day}${month}${year}`;
    if (this.formatDate(visit_date) == formattedDate) {
      return true;
    } else {
      return false;
    }
  }
  redirectClientPage(id: string) {
    this.router.navigate(['clients/pet'], {
      queryParams: { petId: id }
    });
  }
  redirectVisitPage(id: string) {
    this.router.navigate(['appointment'], {
      queryParams: { appointmentId: id }
    });
  }
  showData() {
    
    this.apiService.getVet(this.storageService.SessionGetStorage("uid")).then((vet) => {
      this.vet = vet;
    });

    this.apiService.getAppointments(this.storageService.SessionGetStorage("uid")).then((clientAppointments) => {
      this.clientAppointments = clientAppointments;
      let today_visit: Boolean = false;
      for (const element of this.clientAppointments) {
        this.apiService.getPet(element.pet_id || '').then((pet) => {
          this.VisitPet = pet;
          if (this.VisitPet.profile_image == '') {
            this.VisitPet.profile_image = '/assets/img/logo_default.svg';
          } else{
            if (this.VisitPet.name == "Toby") {
              this.VisitPet.profile_image = "/assets/img/dogImage1.jpg";
            } else if (this.VisitPet.name == "Dobby") {
              this.VisitPet.profile_image = "/assets/img/dogImage2.jpg";
            } else if (this.VisitPet.name == "Darwin") {
              this.VisitPet.profile_image = "/assets/img/catImage.avif";
            }           
          }
        })
        if (today_visit = this.isTodayVisit(element.end_date || '')) {
          this.isTodayVisits.push(element.end_date || '');
        }
      }
    })




  }
}
