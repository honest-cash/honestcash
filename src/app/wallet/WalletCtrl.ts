import sweetalert from "sweetalert";
import * as simpleWalletProvider from "../../core/lib/simpleWalletProvider";
import bitcoinAuthFlow from "../../core/lib/bitcoinAuthFlow";
import { AuthService } from "../../auth/AuthService";
import ScopeService from "../../core/services/ScopeService";
import WalletService from "../../core/services/WalletService";
import ProfileService from "../../core/services/ProfileService";
import { IGlobalScope } from "../../core/lib/interfaces";
import UserPropsService from "../../core/services/UserPropsService";
import { calculatePasswordHash } from "../../core/lib/crypto";

declare var SimpleWallet: any;
declare var bitbox: any;
declare var QRCode: any;

interface IScopeWalletCtrl extends ng.IScope {
  mnemonic: string;
  privateKey: string;
  addressBCH: string;
  showAdancedOptions: boolean;
  walletInfo: any;
  connectedPrivateKey: string;
  connectedMnemonic: string;
  legacyAddressBCH: string;
  hdPath: string;
  newHdPath: string;
  isWithdrawalAddressBCHValid: boolean;
  canConnectMnemonic: boolean;

  withdraw: (withdrawalAmount: number, withdrawalAddressBCH: string) => Promise<any>;
  onMnemonicChange: (mnemonic: string) => void;
  generate: () => void;
  connect: (privateKey: string, hdPath: string) => void;
  importNewWallet: (newMnemonic, hdPath) => Promise<any>;
  onDepositClick: () => void;
  disconnect: () => void;
  saveRecoveryPhraseBackupProp: () => void;
  checkRecoveryBackup: () => void;
}

export default class WalletCtrl {
  static $inject = [
    "$scope",
    "$rootScope",
    "AuthService",
    "ScopeService",
    "WalletService",
    "ProfileService",
    "UserPropsService",
  ];

  constructor(
      private $scope: IScopeWalletCtrl,
      private $rootScope: IGlobalScope,
      private authService: AuthService,
      private scopeService: ScopeService,
      private walletService: WalletService,
      private profileService: ProfileService,
      private userPropsService: UserPropsService,
    ) {

    $rootScope.walletBalance = {
      bch: 0,
      usd: 0,
      isLoading: true,
    };

    $scope.mnemonic = "";
    $scope.privateKey = "";
    $scope.addressBCH = "";
    $scope.showAdancedOptions = false;
    $scope.walletInfo = {};
    $scope.connectedPrivateKey = localStorage.getItem("HC_BCH_PRIVATE_KEY");
    $scope.connectedMnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
    $scope.hdPath = localStorage.getItem("HC_BCH_HD_PATH") || simpleWalletProvider.defaultHdPath;
    $scope.newHdPath = simpleWalletProvider.defaultHdPath;
    $scope.isWithdrawalAddressBCHValid = true;

    let simpleWallet;
    let lSimpleWallet;

    const checkPassword = async ():
      Promise<{ password?: string; aborted: boolean; isValid: boolean }> => {
      const password = await sweetalert({
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

      const emails = await this.authService.getEmails();

      const data = await this.authService.passwordCheck({
        password: calculatePasswordHash(emails[0], password),
      });

      if (!data.isValid) {
        await sweetalert({
          type: "error",
          title: "Wrong password!",
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

    $scope.saveRecoveryPhraseBackupProp = () => {
      const user = $rootScope.user;
      this.profileService.upsertUserProp(user.id, "recoveryBackedUp", "true", (res) => {
        if (res) {
          const recoveryBackedUpProp = $rootScope.user.userProperties.find(
            p => p.propKey === "recoveryBackedUp",
          );
          if (recoveryBackedUpProp) {
            recoveryBackedUpProp.propValue = "true";
          } else {
            $rootScope.user.userProperties.push(res);
          }
        }
      });
    };

    $scope.checkRecoveryBackup = () => {
      return this.userPropsService.checkRecoveryBackup();
    };

    const refreshBalance = async (wallet) => {
      let walletInfo;

      try {
        walletInfo = await wallet.getWalletInfo();
      } catch (err) {
        $rootScope.walletBalance = {
          bch: 0,
          usd: 0,
          isLoading: false,
        };

        return;
      }

      const { bch, usd } = await this.walletService.getAddressBalances();

      $scope.walletInfo = walletInfo;

      $rootScope.walletBalance = {
        bch,
        usd,
        isLoading: false,
      };

      this.scopeService.safeApply($scope, () => {});
    };

    if ($scope.connectedMnemonic) {
      simpleWallet = new SimpleWallet($scope.connectedMnemonic, {
        HdPath: $scope.hdPath,
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
        HdPath: $scope.hdPath,
      });

      $scope.mnemonic = lSimpleWallet.mnemonic;
      $scope.privateKey = lSimpleWallet.privateKey;
      $scope.addressBCH = lSimpleWallet.address;
      $scope.legacyAddressBCH = lSimpleWallet.legacyAddress;
    };

    $scope.withdraw = async (withdrawalAmount, withdrawalAddressBCH) => {
      const simpleWallet = simpleWalletProvider.get();

      const result = await bitbox.Util.validateAddress(withdrawalAddressBCH);

      if (!result.isvalid) {
        await sweetalert({
          type: "error",
          title: "Oops...",
          text: `The address ${withdrawalAddressBCH} is not a valid Bitcoin Cash address!`,
        });

        return;
      }

      if (withdrawalAmount < 0.0005) {
        await sweetalert({
          type: "error",
          title: "Dust...",
          text: `The amount ${withdrawalAmount} is too small!`,
        });

        return;
      }

      const hasConfirmed = await sweetalert({
        title: "Are you sure?",
        text: `${withdrawalAmount} BCH will be transferred to ${withdrawalAddressBCH}`,
        type: "warning",
        buttons: {
          cancel: true,
          confirm: true,
        },
      });

      if (!hasConfirmed) {
        return;
      }

      const { isValid } = await checkPassword();

      if (!isValid) {
        return;
      }

      let txid;

      console.log(`Paying out ${withdrawalAmount} BCH.`);

      try {
        const res = await simpleWallet.send([
          {
            address: withdrawalAddressBCH,
            amountSat: bitbox.BitcoinCash.toSatoshi(withdrawalAmount),
          },
        ]);

        txid = res.txid;
      } catch (err) {
        console.error(err);

        return sweetalert({
          type: "error",
          title: "Cound not send",
          text: err.message,
        });
      }

      await sweetalert({
        type: "success",
        title: "Transferred!",
        text: `${withdrawalAmount} BCH has been trasferred to ${withdrawalAddressBCH}`,
        footer: `<a target="_blank" href="https://explorer.bitcoin.com/bch/tx/${txid}">` +
          `Receipt ${txid.substring(0, 5)}..${txid.substring(txid.length - 5, txid.length)}</a>`,
      });

      refreshBalance(simpleWallet);
    };

    $scope.connect = (privateKey, hdPath) => {
      if (!lSimpleWallet) {
        lSimpleWallet = new SimpleWallet(privateKey, {
          HdPath: hdPath,
        });

        $scope.privateKey = lSimpleWallet.privateKey;
      }

      $scope.connectedPrivateKey = lSimpleWallet.privateKey;
      $scope.connectedMnemonic = lSimpleWallet.mnemonic;

      $scope.hdPath = lSimpleWallet.HdPath;
      $scope.mnemonic = lSimpleWallet.mnemonic;
      $scope.privateKey = lSimpleWallet.privateKey;
      $scope.addressBCH = lSimpleWallet.address;
      $scope.legacyAddressBCH = lSimpleWallet.legacyAddress;

      this.$rootScope.simpleWallet = {
        address: lSimpleWallet.address as string,
        mnemonic: lSimpleWallet.mnemonic as string,
        privateKey: lSimpleWallet.privateKey as string,
      } as any;

      simpleWalletProvider.saveLocally(lSimpleWallet);
      simpleWalletProvider.set(lSimpleWallet);

      refreshBalance(lSimpleWallet);
    };

    $scope.importNewWallet = async (newMnemonic: string, hdPath: string) => {
      const result = await sweetalert({
        type: "warning",
        title: "Are you sure?",
        text: `You will not be able to recover the previous wallet without the recovery phrase!`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      });

      if (!result) {
        return;
      }

      const { password, isValid } = await checkPassword();

      if (!isValid) {
        return;
      }

      const simpleWallet = new SimpleWallet(newMnemonic);

      const mnemonicEncrypted = SimpleWallet.encrypt(simpleWallet.mnemonic, password);

      this.authService
          .setWallet({ mnemonicEncrypted })
          .then(() => {
            $scope.connect(newMnemonic, hdPath);

            location.reload();
          });
    };

    const disconnect = async () => {
      const result = await sweetalert({
        type: "warning",
        buttons: {
          cancel: true,
          confirm: true,
        },
        title: "Are you sure?",
        text: `You will not be able to recover the previous wallet without the recovery phrase!`,
      });

      if (!result) {
        return;
      }

      const { password, isValid } = await checkPassword();

      if (!isValid) {
        return;
      }

      const simpleWallet = await bitcoinAuthFlow({ password });

      this.authService
            .setWallet({ mnemonicEncrypted: simpleWallet.mnemonicEncrypted })
            .then(() => {
              $scope.connect(simpleWallet.mnemonic, simpleWallet.HdPath);

              location.reload();
            });
    };

    $scope.onDepositClick = () => {
      setTimeout(
        () => {
          const container = document.getElementsByClassName("deposit-address-qr")[0];

          container.innerHTML = "";

          new QRCode(container, simpleWalletProvider.get().address);
        },
        50);
    };

    $scope.onDepositClick();
    $scope.disconnect = disconnect;
  }
}
