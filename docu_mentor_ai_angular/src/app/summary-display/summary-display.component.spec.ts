import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDisplayComponent } from './summary-display.component';

describe('SummaryDisplayComponent', () => {
  let component: SummaryDisplayComponent;
  let fixture: ComponentFixture<SummaryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
