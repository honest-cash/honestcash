import upvoteData from "./upvoteData";
import * as upvoteDistribution from "../src/core/lib/upvoteDistribution";

describe("upvoteDistribution", () => {
  it("calculates receivers of the upvote", () => {
    const calculatedReceivers = upvoteDistribution.determineUpvoteRewards(200000, upvoteData(20), {
      id: 1,
      addressBCH: "bitcoincash:qr95a8y0puqm6y89vtg0y5xleklh682z5u97fm628d",
    });

        // author share (the last one in the array)
    expect(calculatedReceivers[calculatedReceivers.length - 1].amountSat).toBe(80000);

        // correct amount is sent to the voters
    expect(calculatedReceivers[0].amountSat).toBe(200000 * 0.6 / (calculatedReceivers.length - 1));

         // last upvoter gets tip
    expect(calculatedReceivers[0].user.id).toBe(20);
    expect(calculatedReceivers[1].user.id).toBe(19);
    expect(calculatedReceivers[2].user.id).toBe(17);
    expect(calculatedReceivers[3].user.id).toBe(13);
    expect(calculatedReceivers[4].user.id).toBe(5);

    expect(calculatedReceivers.length).toBe(5 + 1);
  });
});
