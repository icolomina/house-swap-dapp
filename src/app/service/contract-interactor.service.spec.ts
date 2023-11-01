import { TestBed } from '@angular/core/testing';

import { ContractInteractorService } from './contract-interactor.service';

describe('ContractInteractorService', () => {
  let service: ContractInteractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractInteractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
