import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripCardComponent } from './add-trip-card.component';

describe('AddTripCardComponent', () => {
  let component: AddTripCardComponent;
  let fixture: ComponentFixture<AddTripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTripCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
