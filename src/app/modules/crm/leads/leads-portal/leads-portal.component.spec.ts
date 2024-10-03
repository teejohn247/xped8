import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsPortalComponent } from './leads-portal.component';

describe('LeadsPortalComponent', () => {
  let component: LeadsPortalComponent;
  let fixture: ComponentFixture<LeadsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
