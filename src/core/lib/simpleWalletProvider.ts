import { ISimpleWallet } from "./interfaces";

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
  // tslint:disable-next-line
  let HdPath;
  let providedMnemonic;

  if (!mnemonic) {
    providedMnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
    HdPath = localStorage.getItem("HC_BCH_HD_PATH") || defaultHdPath;
  }

  if (!providedMnemonic) {
    return;
  }

  const simpleWallet: ISimpleWallet = new SimpleWallet(providedMnemonic, {
    HdPath,
    password,
  });

  saveLocally(simpleWallet);

  set(simpleWallet);

  return simpleWallet;
};

export const get = () => {
  return wallet;
};
