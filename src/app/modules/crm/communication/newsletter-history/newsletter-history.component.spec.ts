import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterHistoryComponent } from './newsletter-history.component';

describe('NewsletterHistoryComponent', () => {
  let component: NewsletterHistoryComponent;
  let fixture: ComponentFixture<NewsletterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
