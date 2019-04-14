const getBaseLog = (x: number, y: number) => Math.log(y) / Math.log(x);

export const determineUpvoteRewards = (lupvotes, author) => {
  let receivers = [];

  const tipAmountSat = 200000;
  const authorAmountPart = 0.4;

     // filter only users with BCH address for receiving tips
  const upvotes = lupvotes.filter(upvote => upvote.user && upvote.user.addressBCH);

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
      upvoteId: upvote.id,
      user: upvote.user,
      address: upvote.user.addressBCH,
      amountSat: null,
    });

    const upvoteIndex = Math.pow(2, payoutIndex) - 1;

    payoutIndex += 1;

    upvote = upvotes[Math.pow(2, payoutIndex) - 1];
  }

  receivers = receivers.map(receiver => {
    receiver.amountSat = tipAmountForUpvoters / receivers.length;

    return receiver;
  });

    // author share
  receivers.push({
    upvoteId: null,
    user: author,
    amountSat: authorAmount,
    address: author.addressBCH,
  });

  let totalPayouts = 0;

  for (const receiver of receivers) {
    totalPayouts += receiver.amountSat;
  }

  if (totalPayouts !== tipAmountSat) {
    throw new Error(
      // tslint:disable-next-line:max-line-length
      `Total payouts ${totalPayouts} are different than the tip amount ${tipAmountSat}. Stopping payouts!`,
    );
  }

  return receivers;
};
