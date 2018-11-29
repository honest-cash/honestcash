
import { distributeFunds } from "./distributeFunds";

/**
const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();
*/

const Bitcoin = require('./bitcointoken');
const bchaddrjs = require('bchaddrjs');
const BitcoinWallet = Bitcoin.Wallet;
const BitcoinDb = Bitcoin.Db;

export default class SimpleWallet {
  constructor(hdPrivateKeyOrMnemonic) {
    this.create(hdPrivateKeyOrMnemonic);
  }

  async getBalance() {
    const wallet = BitcoinWallet.fromHdPrivateKey(this.privateKey);

    const balance = await wallet.getBalance();

    console.log(`Current balance: ${balance/1e8} bitcoin`);

    return balance;
  }

  async send(outs) {
      // const db = BitcoinDb.fromHdPrivateKey(this.privateKey)
      /**
       * [
        { address: "bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h", amountSat: 1000 }
      ]

      return distributeFunds(outs[0].address, {
        mnemonic: this.mnemonic,
        cashAddress: this.address
      });
      */
 
      const wallet = BitcoinWallet.fromHdPrivateKey(this.privateKey);

      let address = outs[0].address;

      if (!bchaddrjs.isLegacyAddress(address)) {
        address = bchaddrjs.toLegacyAddress(address);
      }

      console.log(`Sending ${outs[0].amountSat} sBCH from ${this.legacyAddress} to ${address}`);

      const tx = await wallet.send(outs[0].amountSat, address);

      console.log(`Sent! The transaction ID is ${tx.txid}`)

      return tx;

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
    //const db = BitcoinDb.fromHdPrivateKey(this.privateKey);

    // const id = await db.put({ a: 'aaa' });

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

  create(privateKey) {
      // this.path = path; // path missing
      // this.mnemonic = mnemonic;  // mnemonic missing
      this.privateKey = privateKey || BitcoinWallet.getHdPrivateKey();
      const wallet = BitcoinWallet.fromHdPrivateKey(this.privateKey);

      this.address = wallet.getAddress('cashaddr');
      this.legacyAddress = wallet.getAddress('legacy');
      this.publicKey = wallet.getPublicKey();
      this.privateKey = this.privateKey;

      /**
      mnemonic = mnemonic || BITBOX.Mnemonic.generate(128);

      let rootSeedBuffer = BITBOX.Mnemonic.toSeed(mnemonic);

      let masterHDNode = BITBOX.HDNode.fromSeed(rootSeedBuffer);

      let HDPath = `m/44'/145'/0/0`;
      const path = `${HDPath}/1'`;

      let childNode = masterHDNode.derivePath(path);

      let privateKey = BITBOX.HDNode.toWIF(childNode)

      this.mnemonic = mnemonic;
      this.privateKey = privateKey;
      this.address = BITBOX.HDNode.toCashAddress(childNode);
      this.legacyAddress = BITBOX.HDNode.toLegacyAddress(childNode);
      */
  }
}
