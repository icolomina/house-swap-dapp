import { Injectable } from '@angular/core';
import { ContractTransactionResponse, Signer } from 'ethers';
import { House_swap__factory, House_swap } from '../types';
import { HouseSwap } from '../types/House_swap';
import { parseEther } from 'ethers';
import { TypedEventLog } from '../types/common';

@Injectable({
  providedIn: 'root'
})
export class ContractInteractorService {

  contract!: House_swap;

  constructor() {}

  load(contractAddress: string, signer: Signer): void {
    this.contract = House_swap__factory.connect(contractAddress, signer);
  }

  initialize(house: HouseSwap.HouseStruct): Promise<ContractTransactionResponse> {
    return this.contract.initialize(house);
  }

  addOfer(house: HouseSwap.HouseStruct, amountPayOriginToTarget: number, amountPayTargetToOrigin: number): Promise<ContractTransactionResponse> {
    return this.contract.addOffer(house, amountPayOriginToTarget, amountPayTargetToOrigin);
  }

  acceptOffer(targetAddress: string, acceptedHouse: HouseSwap.HouseStruct, amountPayOriginToTarget: number, amountPayTargetToOrigin: number): Promise<ContractTransactionResponse> {
    return this.contract.acceptOffer(targetAddress, acceptedHouse, amountPayOriginToTarget, amountPayTargetToOrigin);
  }

  performSwap(): Promise<ContractTransactionResponse> {
    return this.contract.performSwap()
  }

  deposit(amount: string): Promise<ContractTransactionResponse> {
    return this.contract.deposit({ value: parseEther(amount)});
  }

  getInfo(): Promise<HouseSwap.SwapStructOutput> {
    return this.contract.info();
  }

  queryFilters(): Promise<Array<TypedEventLog<any>>> {
    return this.contract.queryFilter(this.contract.filters.NewOffer);
  }
}
