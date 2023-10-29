

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { StorageService } from 'src/app/services/storage.service';
import { PetModel } from 'src/app/models/pet.model';

registerLocaleData(localeEn);

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#2D6F28',
    secondary: '#2D6F28',
  },
};


@Component({
  selector: 'app-controller-appointments',
  templateUrl: './controller-appointments.component.html',
  styleUrls: ['./controller-appointments.component.css']
})
export class ControllerAppointmentsComponent implements OnInit {

  locale: string = "en"
  public selectedValue:string =""

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

 
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
  pets: PetModel[] = [];

  activeDayIsOpen: boolean = true;


  constructor(private modal: NgbModal,private storageService:StorageService, private apiService:ApiService, private appointmentService:AppointmentsService) {
  

    this.apiService.getAllPets().then(data => {
      this.pets = data;
    })
    
      

  }

  ngOnInit() {
    this.events = this.appointmentService.eventList;
    console.log(this.events)
    // Suscríbete al Observable después de inicializar eventList
    this.appointmentService.EventList.subscribe((events) => {
      this.events = events; // Actualiza la propiedad local con la lista de eventos
    });
  }

  handleSelectChange(event: any): void {
    this.selectedValue = event.value; // Actualiza selectedValue con el valor seleccionado
  }

  addEvent(): void {

    this.events = [
      ...this.events,{title: '',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors['green'],
      pet_id: this.selectedValue,
    
    },
      
    ];
    
  }

  save(){
    this.appointmentService.eventList = [];
    this.events.forEach(event => {
      if(event.title==''){
        this.pets.forEach(element => {
          if(element.id == event.pet_id){
            
              event.title = element.name!
              
            
          }
        })
      }else {
        const temp = this.pets.find((pet) => pet.id == event.pet_id)
        
        if(event.title != temp?.name){
          event.title = temp?.name!;
        }
      }
      this.appointmentService.addEvent(event);
    })
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.appointmentService.deleteEvent(eventToDelete);
  }

}
