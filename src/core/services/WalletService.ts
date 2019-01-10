import * as simpleWalletProvider from "../lib/simpleWalletProvider";

interface IWalletBalance {
  usd: number;
  bch: number;
}

export default class WalletService {
  constructor(
    private $http: ng.IHttpService
  ) {
    this.startRefreshing();
  }

  private walletBalance: IWalletBalance;
 
  private bchUSDRate: number;
  private walletInfo: {
    balance: number;
    unconfirmedBalance: number
  };

  private async startRefreshing() {
    setInterval(async () => {
      this.walletBalance = await this.updateBalances();
    }, 30 * 1000);
  }

  private async convertBCHtoUSD(bchBalance: number): Promise<IWalletBalance> {
    if (!this.bchUSDRate) {
      const res = await this.$http.get(`https://api.coinbase.com/v2/exchange-rates?currency=BCH`);
      
      this.bchUSDRate = Number((res.data as { data: { rates: { USD: number }}}).data.rates.USD);
    } 

    return {
      bch: bchBalance,
      usd: Number((this.bchUSDRate * bchBalance).toFixed(2))
    };
  }

  private async getMyWalletBalance(): Promise<{ totalBalance: number }> {
    const simpleWallet = simpleWalletProvider.get();

    this.walletInfo = await simpleWallet.getWalletInfo();

    const balanceInBCH = Number((this.walletInfo.balance + this.walletInfo.unconfirmedBalance).toFixed(8));

    return { totalBalance: balanceInBCH };
  }

  public async updateBalances(): Promise<IWalletBalance> {
    const bch = await this.getMyWalletBalance();

    const walletBalance = await this.convertBCHtoUSD(bch.totalBalance);

    return walletBalance;
  }

  public async getAddressBalances(): Promise<IWalletBalance> {
    if (!this.walletBalance) {
      this.walletBalance = await this.updateBalances();
    }

    return this.walletBalance;
  }

  static $inject = [
    "$http"
  ];
}
