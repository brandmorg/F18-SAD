import { TestBed, inject } from '@angular/core/testing';

import { GeneralLedgerService } from './general-ledger.service';

describe('GeneralLedgerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralLedgerService]
    });
  });

  it('should be created', inject([GeneralLedgerService], (service: GeneralLedgerService) => {
    expect(service).toBeTruthy();
  }));
});
