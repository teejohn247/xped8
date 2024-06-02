import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsPortalComponent } from './contacts-portal.component';

describe('ContactsPortalComponent', () => {
  let component: ContactsPortalComponent;
  let fixture: ComponentFixture<ContactsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
