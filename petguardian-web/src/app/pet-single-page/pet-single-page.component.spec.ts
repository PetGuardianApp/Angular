import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSinglePageComponent } from './pet-single-page.component';

describe('PetSinglePageComponent', () => {
  let component: PetSinglePageComponent;
  let fixture: ComponentFixture<PetSinglePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetSinglePageComponent]
    });
    fixture = TestBed.createComponent(PetSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
