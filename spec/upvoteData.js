const create = (no) => {
    const upvotes = [];

    for (let index = 20; index > 0; index--) {
        upvotes.push({
            id: index,
            userId: index,
            user: {
                id: index,
                username: index,
                addressBCH: "bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h",
            }
        });
    }

    return upvotes;
}

module.exports = create;
