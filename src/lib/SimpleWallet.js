const Bitcoin = require('bitcointoken');

const BitcoinWallet = Bitcoin.Wallet;
const BitcoinDb = Bitcoin.Db;

class SimpleWallet {
  constructor(hdPrivateKeyOrMnemonic) {
    this.createWithBitcoinToken(hdPrivateKeyOrMnemonic);
  }

  async send(outs) {
      // const db = BitcoinDb.fromHdPrivateKey(this.privateKey)
      /**
       * [
        { address: "bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h", amountSat: 1000 }
      ]
      */
      const wallet = BitcoinWallet.fromHdPrivateKey(this.privateKey);

      const whatIsIt = await wallet.send(outs[0].amountSat, outs[0].address);

      return whatIsIt;
      /**
      const outputs = outs.map(_ => {
          return {
            data: {},
            owners: [ _.address ],
            amount: _.amountSat / Math.pow(10, 8)
          };
      });

      BitcoinWallet
      db.put(outputs);
      */
  }

  async save(json) {
    // const db = BitcoinDb.fromHdPrivateKey(this.privateKey)
    /**
     * [
      { address: "bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h", amountSat: 1000 }
    ]
    */
    const db = BitcoinDb.fromHdPrivateKey(this.privateKey);

    const id = await db.put({ a: 'aaa' })

    //const data = await db.get(a)
    //console.log(data);

    /**
    const outputs = outs.map(_ => {
        return {
          data: {},
          owners: [ _.address ],
          amount: _.amountSat / Math.pow(10, 8)
        };
    });

    BitcoinWallet
    db.put(outputs);
    */
  }

  createWithBitcoinToken(privateKey) {
    this.privateKey = privateKey || BitcoinWallet.getHdPrivateKey();

    const wallet = BitcoinWallet.fromHdPrivateKey(this.privateKey)

    // this.path = path; // path missing
    // this.mnemonic = mnemonic;  // mnemonic missing
    this.address = wallet.getAddress('cashaddr');
    this.legacyAddress = wallet.getAddress();
    this.publicKey = wallet.getPublicKey();
    this.privateKey = this.privateKey;
  }
}
