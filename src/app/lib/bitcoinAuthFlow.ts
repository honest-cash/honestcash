import swal from "sweetalert";
import { ISimpleWallet } from "./interfaces";

declare var SimpleWallet: any;

const generateWallet = async (data: { password: string }): Promise<ISimpleWallet> => {
  const simpleWallet = new SimpleWallet(null, {
    password: data.password
  });

  await swal({
    type: 'warning',
    title: 'Write down your recovery phrase!',
    text: simpleWallet.mnemonic,
    footer: `This is the key to your Bitcoin wallet. If you lose it, it cannot be recovered and you will loose your funds!`,
  });

  const repeatMnemonic = await swal({
    content: {
      element: "input",
      attributes: {
        placeholder: "Re-enter your recovery phrase",
        type: "string",
      },
    },
  });

  if (repeatMnemonic !== simpleWallet.mnemonic) {
    return generateWallet(data);
  }

  return simpleWallet;
};

export default generateWallet;
