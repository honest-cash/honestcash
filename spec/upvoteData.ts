export default (no: number) => {
  const upvotes = [];

  for (let index = 20; index > 0; index = index - 1) {
    upvotes.push({
      id: index,
      userId: index,
      user: {
        id: index,
        username: index,
        addressBCH: "bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h",
      },
    });
  }

  return upvotes;
};
