let wallet = null;

export const set = (_wallet) => {
    wallet = _wallet;
};

export const get = () => {
    return wallet;
};
