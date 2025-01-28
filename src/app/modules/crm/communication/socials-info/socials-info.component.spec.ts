import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsInfoComponent } from './socials-info.component';

describe('SocialsInfoComponent', () => {
  let component: SocialsInfoComponent;
  let fixture: ComponentFixture<SocialsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
