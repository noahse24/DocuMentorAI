import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDocumentsComponent } from './product-documents.component';

describe('ProductDocumentsComponent', () => {
  let component: ProductDocumentsComponent;
  let fixture: ComponentFixture<ProductDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
