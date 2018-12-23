import moment from "moment";

interface IFetchArgs {
  orderBy: "upvoteCount";
  followerId: number;
  hashtag: string;
  limit: number;
  page: number;
}

export default class FeedService {
    constructor (private $http, private API_URL) {}

    static $inject = [
      "$http", "API_URL"
    ];

    fetchFeeds(query: IFetchArgs, callback) {
      query.page = query.page || 1;

      this.$http({
          url: this.API_URL + "/feeds",
          method: "GET",
          params: query
      }).then((response) => {
          let feeds = response.data;

          for (let feed of feeds) {
              feed.createdAt = moment(feed.createdAt).format("MMM Do YY");
              feed.publishedAt = moment(feed.publishedAt).format("MMM Do YY");
          }

          callback(feeds);
      });
    }
}
