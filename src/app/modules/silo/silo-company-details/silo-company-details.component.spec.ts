import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiloCompanyDetailsComponent } from './silo-company-details.component';

describe('SiloCompanyDetailsComponent', () => {
  let component: SiloCompanyDetailsComponent;
  let fixture: ComponentFixture<SiloCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiloCompanyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiloCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
