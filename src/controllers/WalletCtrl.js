import SimpleWallet from "../lib/SimpleWallet";
import * as simpleWalletProvider from "../lib/simpleWalletProvider";

export default class WalletCtrl {
    constructor($scope) {
        $scope.mnemonic = "";
        $scope.privateKey = "";
        $scope.addressBCH = "";
        // tprv8ZgxMBicQKsPeczhDq5pBJQi1zFME2D34z3T6xgtuTNZowdsUz7ZcP1WaF7oVErVx28k8bYxtdGhDANN1YLQ41EUDapxSJqq6msfTG6Zmkr
        $scope.connectedPrivateKey = localStorage.getItem("HC_BCH_PRIVATE_KEY");

        let simpleWallet, lSimpleWallet;

        if ($scope.connectedPrivateKey) {
            simpleWallet = simpleWalletProvider.get();

            $scope.privateKey = simpleWallet.privateKey;
            $scope.addressBCH = simpleWallet.address;
            $scope.legacyAddressBCH = simpleWallet.legacyAddress;
        }

        $scope.generate = () => {
            lSimpleWallet = new SimpleWallet();

            $scope.privateKey = lSimpleWallet.privateKey;
            $scope.addressBCH = lSimpleWallet.address;
            $scope.legacyAddressBCH = lSimpleWallet.legacyAddress;
        }

        $scope.connect = () => {
            $scope.connectedPrivateKey = $scope.privateKey;

            localStorage.setItem("HC_BCH_PRIVATE_KEY", $scope.connectedPrivateKey);

            simpleWalletProvider.set(lSimpleWallet);
        };

        $scope.disconnect = () => {
            $scope.connectedPrivateKey = null;

            simpleWalletProvider.set(null);

            localStorage.setItem("HC_BCH_PRIVATE_KEY", "");
        };
    }
}

WalletCtrl.$inject = [ "$scope" ];
