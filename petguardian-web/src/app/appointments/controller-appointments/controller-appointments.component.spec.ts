import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerAppointmentsComponent } from './controller-appointments.component';

describe('ControllerAppointmentsComponent', () => {
  let component: ControllerAppointmentsComponent;
  let fixture: ComponentFixture<ControllerAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControllerAppointmentsComponent]
    });
    fixture = TestBed.createComponent(ControllerAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
