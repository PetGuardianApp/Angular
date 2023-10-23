import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';

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
  black: {
    primary: '#000000',
    secondary: '#000000',
  },
  green: {
    primary: '#2D6F28',
    secondary: '#2D6F28',
  },
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  
  uid:string = "";
  private eventListSubject: Subject<Array<CalendarEvent>> = new Subject<Array<CalendarEvent>>();
  public eventList: Array<CalendarEvent> = [];
  
  EventList: Observable<Array<CalendarEvent>> = this.eventListSubject.asObservable();


  constructor(private storageService:StorageService,private apiservice:ApiService) {
    var uid = storageService.SessionGetStorage("uid");
    
    this.apiservice.getAppointments(uid).then (data => {
      
      
      data.forEach(element =>{
        var color = ''
        if(this.parseDateFromString(element.start_date!)! < new Date()){
          color='black'
        }else{
          color='green'
        }
        this.addEvent({
          start: this.parseDateFromString(element.start_date!)!,
          end: this.parseDateFromString(element.end_date!)!,
          title: "Bobby",
          color: { ...colors[color] },
        })
      })
    })
   }


   parseDateFromString(input: string): Date | null {
    // Utiliza expresiones regulares para extraer las partes de la cadena
    const dateRegex = /^(\d{2})(\d{2})(\d{4})_(\d{2}):(\d{2})$/;
    const match = input.match(dateRegex);
  
    if (match) {
      const day = parseInt(match[1]);
      const month = parseInt(match[2]) - 1; // Restamos 1 para que enero sea 0, febrero 1, etc.
      const year = parseInt(match[3]);
      const hour = parseInt(match[4]);
      const minute = parseInt(match[5]);
  
      // Crea un objeto Date con las partes extraídas
      const parsedDate = new Date(year, month, day, hour, minute);
  
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
  
    // Si no se pudo analizar la fecha, retorna null
    return null;
  }


  public addEvent(event: CalendarEvent) {
    this.eventList.push(event);
    this.eventListSubject.next(this.eventList);
  }


}
