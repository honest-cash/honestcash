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
  });

  const repeatMnemonic = await swal({
    text: "The recovery phrase must remain secret at all times, because revealing it to third parties is equivalent to giving them control over the bitcoins secured by that key. The recovery phrase must also be backed up and protected from accidental loss, because if it’s lost it cannot be recovered and the funds secured by it are forever lost, too.",
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
