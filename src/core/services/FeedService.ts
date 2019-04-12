import moment from "moment";
import { dateFormat } from "../config/index";
import SocialSharing from "../lib/SocialSharing";
import { IFetchFeedsArgs } from "../models/models";

export default class FeedService {
  public static $inject = [
    "$http", "API_URL",
  ];

  constructor(
    private $http: ng.IHttpService,
    private API_URL: string,
  ) {}

  public fetchFeeds(query: IFetchFeedsArgs, callback) {
    query.until = query.until || new Date().toISOString();

    this.$http<any[]>({
      method: "GET",
      params: query,
      url: `${this.API_URL}/feeds`,
    }).then((response) => {
      const feeds = response.data;

      for (const feed of feeds) {
        feed.createdAtFormatted = moment(feed.createdAt).utc().format(dateFormat);
        feed.updatedAtFormatted = moment(feed.updatedAt).utc().format(dateFormat);
        feed.publishedAtFormatted = moment(feed.publishedAt).utc().format(dateFormat);
        feed.archivedAtFormatted = moment(feed.deletedAt).utc().format(dateFormat);

        feed.shareURLs = SocialSharing.getFeedShareURLs(feed);
      }

      callback(feeds);
    });
  }
}
