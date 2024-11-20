import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationOverviewComponent } from './communication-overview.component';

describe('CommunicationOverviewComponent', () => {
  let component: CommunicationOverviewComponent;
  let fixture: ComponentFixture<CommunicationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
