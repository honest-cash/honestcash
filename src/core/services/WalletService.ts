import * as simpleWalletProvider from "../lib/simpleWalletProvider";

export interface ICurrencyConversion {
  usd: number;
  bch: number;
}

export default class WalletService {
  public static $inject = [
    "$http",
  ];

  private walletBalance: ICurrencyConversion;

  private bchUSDRate: number;
  private walletInfo: {
    balance: number;
    unconfirmedBalance: number
  };

  constructor(
    private $http: ng.IHttpService,
  ) {
    this.startRefreshing();
  }

  public async updateBalances(): Promise<ICurrencyConversion> {
    const bch = await this.getMyWalletBalance();
    const walletBalance = await this.convertBCHtoUSD(bch.totalBalance);
    return walletBalance;
  }

  public async getAddressBalances(): Promise<ICurrencyConversion> {
    if (!this.walletBalance) {
      this.walletBalance = await this.updateBalances();
    }

    return this.walletBalance;
  }

  private async startRefreshing() {
    setInterval(
      async () => {
        this.walletBalance = await this.updateBalances();
      },
      30 * 1000,
    );
  }

  public async convertBCHtoUSD(bch: number): Promise<ICurrencyConversion> {
    if (!this.bchUSDRate) {
      const res = await this.$http.get(`https://api.coinbase.com/v2/exchange-rates?currency=BCH`);

      this.bchUSDRate = Number((res.data as { data: { rates: { USD: number }}}).data.rates.USD);
    }

    return {
      bch,
      usd: Number((this.bchUSDRate * bch).toFixed(2)),
    };
  }

  public async convertUSDtoBCH(usd: number): Promise<ICurrencyConversion> {
    if (!this.bchUSDRate) {
      const res = await this.$http.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=BCH&callback=JSON_CALLBACK`,
      );

      this.bchUSDRate = Number((res.data as { data: { rates: { USD: number }}}).data.rates.USD);
    }

    return {
      usd,
      bch: Number((1 / this.bchUSDRate * usd).toFixed(6)),
    };
  }

  private async getMyWalletBalance(): Promise<{ totalBalance: number }> {
    const simpleWallet = simpleWalletProvider.get();

    if (!simpleWallet) {
      return { totalBalance: 0 };
    }

    this.walletInfo = await simpleWallet.getWalletInfo();

    const balanceInBCH = Number(
      (this.walletInfo.balance + this.walletInfo.unconfirmedBalance).toFixed(8),
    );

    return { totalBalance: balanceInBCH };
  }
}
