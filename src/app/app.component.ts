import { Component } from '@angular/core';
import { WalletService } from './service/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'house-swap-dapp';
  walletConnected = false;

  constructor(private walletService: WalletService) {

  }

  async connectWallet() {
    await this.walletService.loadSigner();
  }
}
