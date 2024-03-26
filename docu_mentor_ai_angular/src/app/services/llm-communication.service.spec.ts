import { TestBed } from '@angular/core/testing';

import { LlmCommunicationService } from './llm-communication.service';

describe('LlmCommunicationService', () => {
  let service: LlmCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlmCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
