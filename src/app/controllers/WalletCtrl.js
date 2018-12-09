import * as simpleWalletProvider from "../lib/simpleWalletProvider";

/**
 * The path is same with yours.org
 */

export default class WalletCtrl {
    constructor($scope, $rootScope, $q) {
        $scope.mnemonic = "";
        $scope.privateKey = "";
        $scope.addressBCH = "";
        $scope.showAdancedOptions = false;
        $scope.walletInfo = {};
        $scope.connectedPrivateKey = localStorage.getItem("HC_BCH_PRIVATE_KEY");
        $scope.connectedMnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
        $scope.HdPath = localStorage.getItem("HC_BCH_HD_PATH") || simpleWalletProvider.defaultHdPath;
        $scope.addressBalance = 0;

        let simpleWallet, lSimpleWallet;

        $scope.onMnemonicChange = (newMnemonic) => {
            if (newMnemonic && newMnemonic.split(" ").length > 10) {
                $scope.canConnectMnemonic = true;

                return;
            } 

            $scope.canConnectMnemonic = false;
        };

        const refreshBalance = (wallet) => {
            wallet.getWalletInfo()
            .then((walletInfo) => {
                $scope.walletInfo = walletInfo
                $scope.addressBalance = walletInfo.balance + walletInfo.unconfirmedBalance;

                $scope.$apply();
            }, err => {
                $scope.addressBalance = 0;

                $scope.$apply();
            });
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

        $scope.withdraw = async (toAddress) => {
            const simpleWallet = simpleWalletProvider.get();
            
            refreshBalance();

            console.log(`Transfering ${balance} to ${toAddress}`);

            simpleWallet.send([
                { address: toAddress, amountSat: 1000 }
            ]);
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

            localStorage.setItem("HC_BCH_PRIVATE_KEY", lSimpleWallet.privateKey);
            localStorage.setItem("HC_BCH_MNEMONIC", lSimpleWallet.mnemonic);
            localStorage.setItem("HC_BCH_HD_PATH", lSimpleWallet.HdPath);

            simpleWalletProvider.set(lSimpleWallet);

            refreshBalance(lSimpleWallet);
        };

        const disconnect = () => {
            lSimpleWallet = null;

            $scope.connectedPrivateKey = null;
            $scope.connectedMnemonic = null;

            $scope.mnemonic = null;
            $scope.privateKey = null;
            $scope.addressBCH = null;
            $scope.legacyAddressBCH = null;
            $scope.HdPath = simpleWalletProvider.defaultHdPath;
            $scope.canConnectMnemonic = false;

            simpleWalletProvider.set(null);
            $rootScope.simpleWallet = null;

            localStorage.setItem("HC_BCH_PRIVATE_KEY", "");
            localStorage.setItem("HC_BCH_MNEMONIC", "");
            localStorage.setItem("HC_BCH_HD_PATH", simpleWalletProvider.defaultHdPath);
        };

        $scope.onImportClick = () => {
            disconnect();
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

WalletCtrl.$inject = [ "$scope", "$rootScope", "$q" ];
