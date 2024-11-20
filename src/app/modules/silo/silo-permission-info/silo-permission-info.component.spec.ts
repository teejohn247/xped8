import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiloPermissionInfoComponent } from './silo-permission-info.component';

describe('SiloPermissionInfoComponent', () => {
  let component: SiloPermissionInfoComponent;
  let fixture: ComponentFixture<SiloPermissionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiloPermissionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiloPermissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
