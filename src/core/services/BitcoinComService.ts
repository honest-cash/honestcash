interface IBitcoinComAddressRequestResult {
  slpAddress: string;
  cashAddress: string;
  legacyAddress: string;
}

interface IBitcoinComBalanceRequestResult {
  tokenId: string;
  balance: string;
  decimalCount: number;
}

export default class BitcoinComService {

  public static $inject = [
    "$http",
  ];

  constructor(
    private $http: ng.IHttpService,
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {}

  public async getSLPAddressBalance(slpAddress: string):
  Promise<IBitcoinComBalanceRequestResult[]> {
    const res = await this.$http.get(
      `https://rest.bitcoin.com/v2/slp/balancesForAddress/${slpAddress}`,
    );
    return res.data as IBitcoinComBalanceRequestResult[];
  }

  public async convertBCHAddressToSLPAddress(bchAddress: string):
  Promise<IBitcoinComAddressRequestResult> {
    const res = await this.$http.get(
      `https://rest.bitcoin.com/v2/slp/address/convert/${bchAddress}`,
    );
    return res.data as IBitcoinComAddressRequestResult;

  }

}
