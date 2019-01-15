import { client as clientURL } from "../../core/config/index";

export default class SocialSharing {
  static getFeedShareURLs(feed) {
    const hashtags = feed.userPostHashtags ?  feed.userPostHashtags.map(h => h.hashtag).join(',') : "honestcash";
    const uname = feed.user.username;

    return {
      reddit: `https://reddit.com/submit?url=${clientURL}/${uname}/${feed.alias}&title=${feed.title}`,
      twitter: `https://twitter.com/intent/tweet?url=${clientURL}/${uname}/${feed.alias}&text=${feed.title}&via=honest_cash&hashtags=${hashtags}`
    }
  }
}
