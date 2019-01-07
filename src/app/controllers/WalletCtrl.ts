import swal from "sweetalert";
import * as simpleWalletProvider from "../../core/lib/simpleWalletProvider";
import generateWallet from '../../core/lib/bitcoinAuthFlow';
import md5 from "md5";
import { AuthService } from '../../auth/AuthService';

declare var SimpleWallet: any;
declare var bitbox: any;
declare var QRCode: any;

export default class WalletCtrl {
    constructor(
      private $scope,
      private $rootScope,
      private $http,
      private AuthService: AuthService
    ) {
        $scope.mnemonic = "";
        $scope.privateKey = "";
        $scope.addressBCH = "";
        $scope.showAdancedOptions = false;
        $scope.walletInfo = {};
        $scope.connectedPrivateKey = localStorage.getItem("HC_BCH_PRIVATE_KEY");
        $scope.connectedMnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
        $scope.HdPath = localStorage.getItem("HC_BCH_HD_PATH") || simpleWalletProvider.defaultHdPath;
        $scope.newHdPath = simpleWalletProvider.defaultHdPath;
        $scope.addressBalance = 0;
        $scope.addressBalanceInUSD = 0;
        $scope.balanceLoading = true;
        $scope.isWithdrawalAddressBCHValid = true;
        let simpleWallet, lSimpleWallet;

        const checkPassword = async (): Promise<{ password?: string; aborted: boolean; isValid: boolean }> => {
          const password = await swal({
            buttons: {
              cancel: true,
              confirm: true,
            },
            content: {
              element: "input",
              attributes: {
                placeholder: "Enter your password.",
                type: "password",
              },
            },
          });

          if (!password) {
            return { isValid: false, aborted: true };
          }

          const emails = await AuthService.getEmails();

          const data = await AuthService.passwordCheck({
            password: this.AuthService.calculatePasswordHash(emails[0], password)
          });

          if (!data.isValid) {
            await swal({
              type: 'error',
              title: 'Wrong password!',
            });

            return { isValid: false, aborted: false };
          }

          return { password, isValid: true, aborted: false };
        };

        $scope.onMnemonicChange = (newMnemonic) => {
            if (newMnemonic && newMnemonic.split(" ").length > 10) {
                $scope.canConnectMnemonic = true;

                return;
            } 

            $scope.canConnectMnemonic = false;
        };

        const refreshBalance = async (wallet) => {
            let walletInfo;

            try {
              walletInfo = await wallet.getWalletInfo();
            } catch (err) {
              $scope.addressBalance = 0;

              $scope.$apply();

              return;
            }

            $scope.walletInfo = walletInfo;
            const balanceInBHC = (walletInfo.balance + walletInfo.unconfirmedBalance).toFixed(8);
            const currencyRequest = await $http.get(`https://api.coinbase.com/v2/exchange-rates?currency=BCH`);
            const balanceInUSD = currencyRequest.data.data.rates.USD;            
            $scope.addressBalance = balanceInBHC;
            $scope.addressBalanceInUSD  = balanceInBHC * balanceInUSD;
            $scope.balanceLoading = false;

            $scope.$apply();
        };

        if ($scope.connectedMnemonic) {
          simpleWallet = new SimpleWallet($scope.connectedMnemonic, {
              HdPath: $scope.HdPath
          });

          simpleWalletProvider.set(simpleWallet);

          $scope.mnemonic = simpleWallet.mnemonic;
          $scope.privateKey = simpleWallet.privateKey;
          $scope.addressBCH = simpleWallet.address;
          $scope.legacyAddressBCH = simpleWallet.legacyAddress;

          refreshBalance(simpleWallet);
        }

        $scope.generate = () => {
            lSimpleWallet = new SimpleWallet(undefined, {
                HdPath: $scope.HdPath
            });

            $scope.mnemonic = lSimpleWallet.mnemonic;
            $scope.privateKey = lSimpleWallet.privateKey;
            $scope.addressBCH = lSimpleWallet.address;
            $scope.legacyAddressBCH = lSimpleWallet.legacyAddress;
        }

        $scope.withdraw = async (withdrawalAmount, withdrawalAddressBCH) => {
          const simpleWallet = simpleWalletProvider.get();

          const result = await bitbox.Util.validateAddress(withdrawalAddressBCH);

          if (!result.isvalid) {
              await swal({
                type: 'error',
                title: 'Oops...',
                text: `The address ${withdrawalAddressBCH} is not a valid Bitcoin Cash address!`,
              });

              return;
          }

          if (withdrawalAmount < 0.0005) {
              await swal({
                type: 'error',
                title: 'Dust...',
                text: `The amount ${withdrawalAmount} is too small!`,
              });

              return;
          }

          const hasConfirmed = await swal({
              title: 'Are you sure?',
              text: `${withdrawalAmount} BCH will be transferred to ${withdrawalAddressBCH}`,
              type: 'warning',
              buttons: {
                cancel: true,
                confirm: true,
              },
          })

          if (!hasConfirmed) {
              return;
          }

          const { isValid } = await checkPassword();

          if (!isValid) {
            return;
          }

          let txid;

          console.log(`Paying out ${withdrawalAmount} BCH.`)

          try {
              const res = await simpleWallet.send([
                  {
                      address: withdrawalAddressBCH,
                      amountSat: bitbox.BitcoinCash.toSatoshi(withdrawalAmount)
                  }
              ]);

              txid = res.txid;
          } catch (err) {
              return swal({
                  type: 'error',
                  title: 'Error',
                  text: err,
              });
          }

          await swal({
              type: 'success',
              title: 'Transferred!',
              text: `${withdrawalAmount} BCH has been trasferred to ${withdrawalAddressBCH}`,
              footer: `<a target="_blank" href="https://explorer.bitcoin.com/bch/tx/${txid}">Receipt ${txid.substring(0,5)}..${txid.substring(txid.length - 5, txid.length)}</a>`
          })

          refreshBalance(simpleWallet);
        };

        $scope.connect = (privateKey, HdPath) => {
            if (!lSimpleWallet) {
                lSimpleWallet = new SimpleWallet(privateKey, {
                    HdPath: HdPath
                });

                $scope.privateKey = lSimpleWallet.privateKey;
            }

            $scope.connectedPrivateKey = lSimpleWallet.privateKey;
            $scope.connectedMnemonic = lSimpleWallet.mnemonic;

            $scope.HdPath = lSimpleWallet.HdPath;
            $scope.mnemonic = lSimpleWallet.mnemonic;
            $scope.privateKey = lSimpleWallet.privateKey;
            $scope.addressBCH = lSimpleWallet.address;
            $scope.legacyAddressBCH = lSimpleWallet.legacyAddress;

            $rootScope.simpleWallet = {
                address: lSimpleWallet.address,
                mnemonic: lSimpleWallet.mnemonic,
                privateKey: lSimpleWallet.privateKey
            };

            simpleWalletProvider.saveLocally(lSimpleWallet);
            simpleWalletProvider.set(lSimpleWallet);

            refreshBalance(lSimpleWallet);
        };

        $scope.importNewWallet = async (newMnemonic, HdPath) => {
          const result = await swal({
            type: 'warning',
            title: 'Are you sure?',
            text: `You will not be able to recover the previous wallet without the recovery phrase!`,
            buttons: {
              cancel: true,
              confirm: true,
            }
          });

          if (!result) {
            return;
          }

          const { password, isValid } = await checkPassword();

          if (!isValid) {
            return;
          }

          let simpleWallet = new SimpleWallet(newMnemonic);

          const mnemonicEncrypted = SimpleWallet.encrypt(simpleWallet.mnemonic, password);

          this.AuthService
          .setWallet({ mnemonicEncrypted })
          .then(() => {
            $scope.connect(newMnemonic, HdPath);

            location.reload();
          });
        };

        const disconnect = async () => {
            const result = await swal({
                type: 'warning',
                buttons: {
                  cancel: true,
                  confirm: true,
                },
                title: 'Are you sure?',
                text: `You will not be able to recover the previous wallet without the recovery phrase!`,
            })

            if (!result) {
              return;
            }

            const { password, isValid } = await checkPassword();

            if (!isValid) {
              return;
            }

            const simpleWallet = await generateWallet({ password });

            this.AuthService
            .setWallet({ mnemonicEncrypted: simpleWallet.mnemonicEncrypted })
            .then(() => {
              $scope.connect(simpleWallet.mnemonic, simpleWallet.HdPath);

              location.reload();
            });
        };

        $scope.onDepositClick = () => {
            setTimeout(() => {
                const container = document.getElementsByClassName("deposit-address-qr")[0];

                container.innerHTML = "";

                new QRCode(container, simpleWalletProvider.get().address);
            }, 50);
        };

        $scope.onDepositClick();
        $scope.disconnect = disconnect;
    }

    static $inject = [ "$scope", "$rootScope", "$http", "AuthService" ];
}
