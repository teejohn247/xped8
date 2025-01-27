import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsHistoryComponent } from './socials-history.component';

describe('SocialsHistoryComponent', () => {
  let component: SocialsHistoryComponent;
  let fixture: ComponentFixture<SocialsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
