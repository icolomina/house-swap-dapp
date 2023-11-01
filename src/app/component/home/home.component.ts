import { Component, OnInit } from '@angular/core';
import { BaseContract, Signer, ContractTransactionResponse, ParamType } from 'ethers';
import { lastValueFrom } from 'rxjs';
import { ContractDeployerService } from 'src/app/service/contract-deployer.service';
import { ContractInteractorService } from 'src/app/service/contract-interactor.service';
import { WalletService } from 'src/app/service/wallet.service';
import { TypedEventLog } from 'src/app/types/common';
import { HouseSwap, NewOfferEvent } from 'src/app/types/House_swap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  walletConnected = false;
  constructor(private walletSrv: WalletService, private contractDeployerSrv: ContractDeployerService, private contractInteractorSrv: ContractInteractorService){

  }

  ngOnInit(): void {
    this.walletSrv.connectSubject.asObservable().subscribe(
      (value: boolean) => {
        if(value){
          this.walletConnected = value;
        }
      }
    )
  }

  async deployContract() {

    const contractAbi$ = this.contractDeployerSrv.getContractAbi();
    const contractAbi  = await lastValueFrom(contractAbi$);

    const abiRaw: string = JSON.stringify(contractAbi);
    const contractFactory = this.contractDeployerSrv.getContractFromSolidity(abiRaw, this.walletSrv.signer);

    this
      .contractDeployerSrv
      .deployContract(contractFactory)
      .then(
        (contract: BaseContract) => {
            contract.waitForDeployment().then(
              async () => {
                const contractAddress = await contract.getAddress();
                this.contractInteractorSrv.load(contractAddress, this.walletSrv.signer);
                console.log(contractAddress);
              }
            ).catch(
              (error: any) => {
                console.log(error);
              }
            );
        }
      )
      .catch(
        (error: any) => {
          console.log(error);
        }
    )

  }

  async initializeContract() {
    const address = await this.walletSrv.signer.getAddress();
    const house: HouseSwap.HouseStruct = {
      houseType: 'apartment',
      link: 'https://www.infolink.com',
      value: 52665,
      propietary: address
    }

    this
      .contractInteractorSrv
      .initialize(house)
      .then(
        async (callResult: ContractTransactionResponse) => {
          console.log(callResult.toJSON())
      })
  }

  async addOffer(contractAddress: string) {
    const address = await this.walletSrv.signer.getAddress();
    const house: HouseSwap.HouseStruct = {
      houseType: 'apartment',
      link: 'https://www.infolink2.com',
      value: 44158,
      propietary: address
    }

    this
      .contractInteractorSrv
      .addOfer(house, 0, 199865245)
      .then(
        async (callResult: ContractTransactionResponse) => {
          console.log(callResult.toJSON())
      })
  }

  getContractOffers(contractAddress: string) {
    this.contractInteractorSrv.queryFilters().then(
      (result: TypedEventLog<any>[]) => {
        if(result.length > 0) {
          result.forEach((e: TypedEventLog<any>) => {
            if(result.length > 0) {
              result.forEach((e: TypedEventLog<any>) => {
                const eventData = e.args[0][0];
                console.log('HouseType:' + eventData[0]);
                console.log('value:' + eventData[1]);
                console.log('Link:' + eventData[2]);
                console.log('Propietary:' + eventData[3]);
              })
            }
          })
        }
      }
    );
  }

}


