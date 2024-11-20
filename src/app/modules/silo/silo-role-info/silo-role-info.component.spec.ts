import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiloRoleInfoComponent } from './silo-role-info.component';

describe('SiloRoleInfoComponent', () => {
  let component: SiloRoleInfoComponent;
  let fixture: ComponentFixture<SiloRoleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiloRoleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiloRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
