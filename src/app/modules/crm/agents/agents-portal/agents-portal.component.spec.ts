import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsPortalComponent } from './agents-portal.component';

describe('AgentsPortalComponent', () => {
  let component: AgentsPortalComponent;
  let fixture: ComponentFixture<AgentsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
