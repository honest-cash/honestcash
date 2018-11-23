const metaDefault = {
    title: "Honest Cash",
    author: 'Honest Cash',
    description: 'honest.cash is a social network where you can earn (Bitcoin) Cash if you create value. Our mission is improve the quality of content on the internet and to get people paid for doing work they love.',
    robots: 'index, follow',
    keywords: 'bitcoin,bitcoincash,honestcash,socialnetwork',
    ogTitle: "Honest.Cash",
    ogSite_name: "Honest.Cash",
    ogUrl: "https://honest.cash/",
    ogDescription: 'honest.cash is a social network where you can earn (Bitcoin) Cash if you create value. Our mission is improve the quality of content on the internet and to get people paid for doing work they love.',
    ogType: "website",
    ogLocale: "locale",
    ogImage: "http://www.honest.cash/img/fb_post.png",
    twitterTitle: "Honest Cash",
    twitterUrl: "https://www.honest.cash/",
    twitterDescription: 'honest.cash is a social network where you can earn (Bitcoin) Cash if you create value. Our mission is improve the quality of content on the internet and to get people paid for doing work they love.'
};

const getForPost = (post) => {
    const url = "http://honest.cash" + post.user.username + "/" + post.alias;

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
        "ogImage": "null"
    };
}

module.exports = {
    getForPost,
    metaDefault
};
