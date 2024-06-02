import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPortalComponent } from './support-portal.component';

describe('SupportPortalComponent', () => {
  let component: SupportPortalComponent;
  let fixture: ComponentFixture<SupportPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
