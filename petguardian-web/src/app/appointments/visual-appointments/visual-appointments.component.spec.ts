import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualAppointmentsComponent } from './visual-appointments.component';

describe('VisualAppointmentsComponent', () => {
  let component: VisualAppointmentsComponent;
  let fixture: ComponentFixture<VisualAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualAppointmentsComponent]
    });
    fixture = TestBed.createComponent(VisualAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
