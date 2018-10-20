import { TestBed, inject } from '@angular/core/testing';

import { JournalizeService } from './journalize.service';

describe('JournalizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JournalizeService]
    });
  });

  it('should be created', inject([JournalizeService], (service: JournalizeService) => {
    expect(service).toBeTruthy();
  }));
});
