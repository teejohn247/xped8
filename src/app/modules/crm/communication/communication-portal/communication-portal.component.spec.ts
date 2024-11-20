import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationPortalComponent } from './communication-portal.component';

describe('CommunicationPortalComponent', () => {
  let component: CommunicationPortalComponent;
  let fixture: ComponentFixture<CommunicationPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
