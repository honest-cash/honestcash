import { ISimpleWallet } from "./interfaces";
import * as logger from "./logger";

declare var SimpleWallet: any;

let wallet = null;

export const defaultHdPath = "m/44'/0'/0'/0/0";

export const set = (lWallet: ISimpleWallet) => {
  wallet = lWallet;
};

export const clean = () => {
  wallet = null;

  localStorage.setItem("HC_BCH_PRIVATE_KEY", "");
  localStorage.setItem("HC_BCH_MNEMONIC", "");
};

export const saveLocally = (simpleWallet: ISimpleWallet) => {
  localStorage.setItem("HC_BCH_PRIVATE_KEY", simpleWallet.privateKey);
  localStorage.setItem("HC_BCH_MNEMONIC", simpleWallet.mnemonic);
  localStorage.setItem("HC_BCH_HD_PATH", simpleWallet.HdPath);
};

export const loadWallet = (mnemonic?: string, password?: string) => {
  logger.log(`Loading wallet: ${mnemonic}, ${password}, ${defaultHdPath}`);

  // tslint:disable-next-line
  let HdPath: string;
  let providedMnemonic: string = mnemonic;

  if (!mnemonic) {
    logger.log("No mnemonic provided, loading from local storage.");

    providedMnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
    HdPath = localStorage.getItem("HC_BCH_HD_PATH") || defaultHdPath;
  }

  if (!providedMnemonic) {
    logger.log("No mnemonic so the wallet could not be loaded!");

    return;
  }

  const simpleWallet: ISimpleWallet = new SimpleWallet(providedMnemonic, {
    HdPath,
    password,
  });

  logger.log(simpleWallet);

  saveLocally(simpleWallet);

  set(simpleWallet);

  return simpleWallet;
};

export const get = () => {
  return wallet;
};
