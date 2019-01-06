const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
};

const determineUpvoteRewards = (upvotes, author) => {
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
            upvoteId: upvote.id,
            user: upvote.user,
            address: upvote.user.addressBCH
        });
       
        const upvoteIndex = Math.pow(2, payoutIndex) - 1;

        console.log(`The ${upvoteIndex}th user from the end will be rewarded.`)

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
        address: author.addressBCH
    });

    let totalPayouts = 0;

    for (let receiver of receivers) {
        totalPayouts += receiver.amountSat;
    }

    console.log(`Total rewards payouts: ${totalPayouts}`);

    if (totalPayouts !== tipAmountSat) {
        throw new Error(`Total payouts ${totalPayouts} are different than the tip amount ${tipAmountSat}. Stopping payouts!`)
    }

    return receivers;
};

module.exports = {
    determineUpvoteRewards
};