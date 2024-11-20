import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiloSubscriptionActivationComponent } from './silo-subscription-activation.component';

describe('SiloSubscriptionActivationComponent', () => {
  let component: SiloSubscriptionActivationComponent;
  let fixture: ComponentFixture<SiloSubscriptionActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiloSubscriptionActivationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiloSubscriptionActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
