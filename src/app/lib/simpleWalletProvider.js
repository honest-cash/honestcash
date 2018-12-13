let wallet = null;

export const defaultHdPath = "m/44'/0'/0'/0/0";

export const set = (_wallet) => {
    wallet = _wallet;
};

export const saveLocally = simpleWallet => {
  localStorage.setItem("HC_BCH_PRIVATE_KEY", simpleWallet.privateKey);
  localStorage.setItem("HC_BCH_MNEMONIC", simpleWallet.mnemonic);
  localStorage.setItem("HC_BCH_HD_PATH", simpleWallet.HdPath);
};

export const initWallet = mnemonic => {
  let HdPath;

  if (!mnemonic) {
    mnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
    HdPath = localStorage.getItem("HC_BCH_HD_PATH") || defaultHdPath;
  }

  const simpleWallet = new SimpleWallet(mnemonic, {
    HdPath
  });
 
  saveLocally(simpleWallet);

  set(simpleWallet);

  return simpleWallet;
};

export const get = () => {
    return wallet;
};
