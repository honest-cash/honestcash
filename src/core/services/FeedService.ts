import moment from "moment";
import SocialSharing from '../lib/SocialSharing';
import { IFetchFeedsArgs } from '../models/models';
import { dateFormat } from "../config/index";

export default class FeedService {
    constructor (
      private $http,
      private API_URL) {}

    static $inject = [
      "$http", "API_URL"
    ]

    public fetchFeeds(query: IFetchFeedsArgs, callback) {
      query.until = query.until || new Date().toISOString();

      this.$http({
          url: this.API_URL + "/feeds",
          method: "GET",
          params: query
      }).then((response) => {
          let feeds = response.data;

          for (let feed of feeds) {
            feed.shareURLs = SocialSharing.getFeedShareURLs(feed);
            feed.createdAtFormatted = moment(feed.createdAt).utc().format(dateFormat);
            feed.publishedAtFormatted = moment(feed.publishedAt).utc().format(dateFormat);
            feed.createdAt = moment(feed.createdAt).utc().format(dateFormat);
            feed.publishedAt = moment(feed.publishedAt).utc().format(dateFormat);
          }

          callback(feeds);
      });
    }
}
