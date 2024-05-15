import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocumentService } from './document.service';

describe('DocumentService with Real API', () => {
  let service: DocumentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentService]
    });
    service = TestBed.inject(DocumentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve documents from the API via GET', () => {
    const dummyDocuments = [{ id: 1, title: 'Test Doc' }];

    service.retrieveDocuments('product').subscribe(docs => {
      expect(docs.length).toBe(1);
      expect(docs).toEqual(dummyDocuments);
    });

    const request = httpMock.expectOne(`${service.apiUrl}/documents/product`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDocuments);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
