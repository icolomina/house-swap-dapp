import { Injectable } from '@angular/core';
import { BaseContract, ContractFactory, ContractRunner } from 'ethers';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractDeployerService {

  private contractUrl: string = '/assets/house_swap.json';

  constructor(private httpClient: HttpClient) { }

  getContractFromSolidity(solidityOutput: any, signer: ContractRunner): ContractFactory {

    return ContractFactory.fromSolidity(solidityOutput, signer);
  }

  deployContract(contract: ContractFactory): Promise<BaseContract>{
    return contract.deploy();
  }

  getContractAbi(): Observable<any> {
    return this.httpClient.get(this.contractUrl);
  }
}
