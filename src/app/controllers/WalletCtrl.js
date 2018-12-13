import swal from 'sweetalert2';
import * as simpleWalletProvider from "../lib/simpleWalletProvider";
import generatePassword from '../lib/bitcoinAuthFlow';
import md5 from 'md5';

export default class WalletCtrl {
    constructor($scope, $rootScope, AuthService) {
        $scope.mnemonic = "";
        $scope.privateKey = "";
        $scope.addressBCH = "";
        $scope.showAdancedOptions = false;
        $scope.walletInfo = {};
        $scope.connectedPrivateKey = localStorage.getItem("HC_BCH_PRIVATE_KEY");
        $scope.connectedMnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
        $scope.HdPath = localStorage.getItem("HC_BCH_HD_PATH") || simpleWalletProvider.defaultHdPath;
        $scope.addressBalance = 0;
        $scope.isWithdrawalAddressBCHValid = true;
        let simpleWallet, lSimpleWallet;

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

            $scope.walletInfo = walletInfo
            $scope.addressBalance = (walletInfo.balance + walletInfo.unconfirmedBalance).toFixed(8);

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
                return swal({
                    type: 'error',
                    title: 'Oops...',
                    text: `The address ${withdrawalAddressBCH} is not a valid Bitcoin Cash address!`,
                  })
            }

            if (withdrawalAmount < 0.0005) {
                return swal({
                    type: 'error',
                    title: 'Dust...',
                    text: `The amount ${withdrawalAmount} is too small!`,
                  })
            }

            swal({
                title: 'Are you sure?',
                text: `${withdrawalAmount} BCH will be transferred to ${withdrawalAddressBCH}`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, transfer it!'
              }).then(async (result) => {
                    if (!result.value) {
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

                    swal({
                        type: 'success',
                        title: 'Transferred!',
                        text: `${withdrawalAmount} BCH has been trasferred to ${withdrawalAddressBCH}`,
                        footer: `<a target="_blank" href="https://explorer.bitcoin.com/bch/tx/${txid}">Receipt ${txid.substring(0,5)}..${txid.substring(txid.length - 5, txid.length)}</a>`
                    }).then(() => {
                        refreshBalance(simpleWallet);
                    });
              });
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

        $scope.importNewWallet = (newMnemonic, HdPath) => {
          swal({
            type: 'warning',
            title: 'Are you sure?',
            text: `You will not be able to recover the previous wallet without the recovery phrase!`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (!result.value) {
              return;
            }

            AuthService.
            setPassword({ password: md5(newMnemonic) })
            .then(() => {
              $scope.connect(newMnemonic, HdPath);

              location.reload();
            })
          });
        };

        const disconnect = () => {
            swal({
                type: 'warning',
                title: 'Are you sure?',
                text: `You will not be able to recover the previous wallet without the recovery phrase!`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, get me a new wallet!'
            }).then((result) => {
              if (!result.value) {
                return;
              }

              generatePassword(null, (password, mnemonic) => {
                AuthService.setPassword({ password }).then(() => {
                  $scope.connect(mnemonic);
                })
              });
            });
        };

        $scope.onImportClick = () => {

        };

        $scope.onDepositClick = () => {
            setTimeout(() => {
                const container = document.getElementsByClassName("deposit-address-qr")[0];

                container.innerHTML = "";

                new QRCode(container, simpleWalletProvider.get().address);
            }, 50);
        };

        $scope.disconnect = disconnect;
    }
}

WalletCtrl.$inject = [ "$scope", "$rootScope", "AuthService" ];
