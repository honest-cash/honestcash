import moment from "moment";
import SocialSharing from '../lib/SocialSharing';
import { IFetchFeedsArgs } from '../models/models';
import { dateFormat } from "../config/index";
import { IHttpService } from "angular";

export default class FeedService {
  public static $inject = [
    "$http", "API_URL"
  ]

  constructor(
    private $http: IHttpService,
    private API_URL: strig
  ) {}

  

  public fetchFeeds(query: IFetchFeedsArgs, callback) {
    query.until = query.until || new Date().toISOString();

    this.$http<any[]>({
        url: this.API_URL + "/feeds",
        method: "GET",
        params: query
    }).then((response) => {
        const feeds = response.data;

        for (const feed of feeds) {
          feed.shareURLs = SocialSharing.getFeedShareURLs(feed);
          feed.createdAtFormatted = moment(feed.createdAt).utc().format(dateFormat);
          feed.publishedAtFormatted = moment(feed.publishedAt).utc().format(dateFormat);
        }

        callback(feeds);
    });
  }
}
