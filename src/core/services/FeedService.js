import moment from "moment";
export default class FeedService {
    constructor ($http, API_URL) {
        var fetchFeeds = (query, callback) => {
            $http({
                url: API_URL + "/feeds",
                method: "GET",
                params: {
                    followerId: query.followerId,
                    hashtag: query.hashtag,
                    sort: query.sort,
                    filter: query.filter,
                    page: (query.page) ? query.page : 1,
                    userId: query.userId,
                    algorithm: query.algorithm
                }
            }).then((response) => {
                let feeds = response.data;

                for (let feed of feeds) {
                    feed.createdAt = moment(feed.createdAt).format("MMM Do YY");
                }

                callback(feeds);
            });
        };

        this.fetchFeeds = fetchFeeds;
    }
}

FeedService.$inject = [
    "$http", "API_URL"
];
