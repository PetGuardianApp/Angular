import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSinglePageComponent } from './client-single-page.component';

describe('ClientSinglePageComponent', () => {
  let component: ClientSinglePageComponent;
  let fixture: ComponentFixture<ClientSinglePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSinglePageComponent]
    });
    fixture = TestBed.createComponent(ClientSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
