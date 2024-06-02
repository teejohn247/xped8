import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsProfileComponent } from './contacts-profile.component';

describe('ContactsProfileComponent', () => {
  let component: ContactsProfileComponent;
  let fixture: ComponentFixture<ContactsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
