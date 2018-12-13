import swal from 'sweetalert';
import md5 from "md5";

const generatePassword = (data, callback) => {
  data = data || {};

  if (!data.password) {
    const simpleWallet = new SimpleWallet();

    data.password = simpleWallet.mnemonic;
  }

  swal({
      type: 'warning',
      title: 'Write down your recovery phrase!',
      text: data.password,
      footer: `This is the key to your Bitcoin wallet. If you loose it, it cannot be recovered and you will loose your funds!`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I saved it!'
  }).then(() => {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Re-enter your recovery phrase",
          type: "string",
        },
      },
    })
    .then(repeatPassword => {
      if (repeatPassword !== data.password) {
        return generatePassword(data, callback);
      }

      const passwordHash = md5(data.password);

      callback(passwordHash, data.password);
    });
  });
};

export default generatePassword;