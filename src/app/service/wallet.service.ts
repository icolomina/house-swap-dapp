import { Injectable } from '@angular/core';
import { BrowserProvider, Signer, parseEther } from 'ethers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private connected = false;
  public signer!: Signer;

  public connectSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  async loadSigner(): Promise<void> {
    const provider = new BrowserProvider(window.ethereum);
    const currentBalance = await provider.getBalance((await provider.getSigner()).address);
    if(currentBalance <= 0) {
      throw new Error('Fund your wallet before using this app');
    }

    localStorage.setItem('current_balance', currentBalance.toString())
    this.signer = await provider.getSigner();
    this.connected = true;
    this.connectSubject.next(true);
  }

  getCurrentBalace(): bigint {
    const currentBalance = localStorage.getItem('current_balance') as string;
    return parseEther(currentBalance);
  }

  isConnected(): boolean {
    return this.connected;
  }

}
