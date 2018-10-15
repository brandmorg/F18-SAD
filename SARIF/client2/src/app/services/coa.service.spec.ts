import { TestBed, inject } from '@angular/core/testing';

import { CoAService } from './coa.service';

describe('CoAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoAService]
    });
  });

  it('should be created', inject([CoAService], (service: CoAService) => {
    expect(service).toBeTruthy();
  }));
});
