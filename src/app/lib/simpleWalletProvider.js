let wallet = null;

export const defaultHdPath = "m/44'/0'/0'/0/0";

export const set = (_wallet) => {
    wallet = _wallet;
};

export const get = () => {
    return wallet;
};
