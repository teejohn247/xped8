import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketActivitiesComponent } from './ticket-activities.component';

describe('TicketActivitiesComponent', () => {
  let component: TicketActivitiesComponent;
  let fixture: ComponentFixture<TicketActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
