import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiloDashboardComponent } from './silo-dashboard.component';

describe('SiloDashboardComponent', () => {
  let component: SiloDashboardComponent;
  let fixture: ComponentFixture<SiloDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiloDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiloDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
