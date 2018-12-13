const metaDefault = {
    title: "Honest Cash",
    author: 'Honest Cash',
    description: 'honest.cash is a social network where you can earn (Bitcoin) Cash if you create value. Our mission is improve the quality of content on the internet and to get people paid for doing work they love.',
    robots: 'index, follow',
    keywords: 'bitcoin,bitcoincash,honestcash,socialnetwork,permissionless,uncensorable',
    ogTitle: "Honest.Cash",
    ogSite_name: "Honest.Cash",
    ogUrl: "https://honest.cash/img/honest_social.png",
    ogDescription: 'honest.cash is a social network where you can earn (Bitcoin) Cash if you create value. Our mission is improve the quality of content on the internet and to get people paid for doing work they love.',
    ogType: "website",
    ogLocale: "locale",
    ogImage: "https://honest.cash/img/honest_social.png",
    twitterTitle: "Honest Cash",
    twitterUrl: "https://www.honest.cash/",
    twitterDescription: 'honest.cash is a social network where you can earn (Bitcoin) Cash if you create value. Our mission is improve the quality of content on the internet and to get people paid for doing work they love.'
};

const getForPost = (post) => {
    const url = "https://honest.cash/" + post.user.username + "/" + post.alias;

    const title = post.title + " by @" + post.user.username + " | Honest Cash";

    const desc = post.userPostHashtags.map(item => {return item.hashtag; }).join(", ");

    return {
        "title": title,
        "description": desc,
        "author": post.username,
        "ogTitle": title,
        "ogDescription": desc,
        "twitterDescription": desc,
        "twitterTitle": title,
        "ogUrl": url,
        "ogImage": post.imageUrl || metaDefault.ogImage
    };
};

const getForProfile = (profile) => {
    const url = "https://honest.cash/profile/" + profile.username;

    const title = `@${profile.username} | Honest Cash`;

    const desc = `The latest Stories from @${profile.username} on Honest Cash`;

    return {
        "title": title,
        "description": desc,
        "author": profile.username,
        "ogTitle": title,
        "ogDescription": desc,
        "twitterDescription": desc,
        "twitterTitle": title,
        "ogUrl": url,
        "ogImage": profile.imageUrl
    };
};

module.exports = {
    getForProfile,
    getForPost,
    metaDefault
};
