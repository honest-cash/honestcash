import sweetalert from "sweetalert";
import { ISimpleWallet } from "./interfaces";

declare var SimpleWallet: any;

interface IGenerateWalletArgs {
  password: string;
  mnemonic?: string;
}

const generateWallet = async (data: IGenerateWalletArgs): Promise<ISimpleWallet> => {
  const simpleWallet = new SimpleWallet(data.mnemonic);

  simpleWallet.mnemonicEncrypted = SimpleWallet.encrypt(simpleWallet.mnemonic, data.password);

  await sweetalert({
    type: "warning",
    title: "Write down your recovery phrase!",
    text: simpleWallet.mnemonic,
  });

  const repeatMnemonic = await sweetalert({
    text: `The recovery phrase must remain secret at all times, ` +
      `because revealing it to third parties is equivalent to giving them ` +
      `control over the bitcoins secured by that key. The recovery phrase must also be ` +
      `backed up and protected from accidental loss, because if it’s lost it cannot be ` +
      `recovered and the funds secured by it are forever lost, too.`,
    buttons: true,
    content: {
      element: "input",
      attributes: {
        placeholder: "Re-enter your recovery phrase",
        type: "string",
      },
    },
  });

  if (!repeatMnemonic) {
    return generateWallet({
      password: data.password,
      mnemonic: simpleWallet.mnemonic,
    });
  }

  if (repeatMnemonic !== simpleWallet.mnemonic) {
    await sweetalert({
      type: "errpr",
      title: "Wrong",
      text: "Try again!",
    });

    return generateWallet({
      password: data.password,
      mnemonic: simpleWallet.mnemonic,
    });
  }

  return simpleWallet;
};

export default generateWallet;
