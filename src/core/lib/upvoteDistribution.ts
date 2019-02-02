interface IUpvoteDistributionReceiver {
  amountSat: number;
  upvoteId: number;
  user: { addressBCH: string; username: string; };
  address: string;
}

const getBaseLog = (x, y) => {
  return Math.log(y) / Math.log(x);
};

export const satoshiToBch = (amountSat: number): string => {
  return (amountSat / 100000000).toFixed(5);
};

export const determineUpvoteRewards = (upvotes, author): IUpvoteDistributionReceiver[] => {
  let receivers = [];

  const tipAmountSat = 200000;
  const authorAmountPart = 0.4;

  // filter only users with BCH address for receiving tips
  upvotes = upvotes.filter(_ => _.user && _.user.addressBCH);

  let authorAmount;

  if (upvotes.length === 0) {
    authorAmount = tipAmountSat;
  } else {
    authorAmount = tipAmountSat * authorAmountPart;
  }

  let payoutIndex = 0;
  const tipAmountForUpvoters = tipAmountSat - authorAmount;

  let upvote = upvotes[Math.pow(2, payoutIndex) - 1];

  while (upvote) {
    receivers.push({
      address: upvote.user.addressBCH,
      upvoteId: upvote.id,
      user: upvote.user
    });

    const upvoteIndex = Math.pow(2, payoutIndex) - 1;

    console.log(`The ${upvoteIndex}th user from the end will be rewarded.`)

    payoutIndex += 1;

    upvote = upvotes[Math.pow(2, payoutIndex) - 1];
  }

  receivers = receivers.map((receiver) => {
    receiver.amountSat = tipAmountForUpvoters / receivers.length;

    return receiver;
  });

  // author share
  receivers.push({
    address: author.addressBCH,
    amountSat: authorAmount,
    upvoteId: null,
    user: author
  });

  let totalPayouts = 0;

  for (const receiver of receivers) {
    totalPayouts += receiver.amountSat;
  }

  console.log(`Total rewards payouts: ${totalPayouts}`);

  if (totalPayouts !== tipAmountSat) {
    throw new Error(
      `Total payouts ${totalPayouts} are different than the tip amount ${tipAmountSat}. Stopping payouts!`
    );
  }

  return receivers as IUpvoteDistributionReceiver[];
};
