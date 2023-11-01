import { TestBed } from '@angular/core/testing';

import { ContractDeployerService } from './contract-deployer.service';

describe('ContractDeployerService', () => {
  let service: ContractDeployerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractDeployerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
