export default function($http, API_URL) {
    var fetchFeeds = (query, callback) => {
        $http({
            url: API_URL + "/feeds",
            method: "GET",
            params: {
                hashtag: query.hashtag,
                sort: query.sort,
                filter: query.filter,
                page: (query.page) ? query.page : 1,
                userId: query.userId,
                algorithm: query.algorithm
            }
        }).then((response) => {
            callback(response.data);
        });
    };

    return {
        fetchFeeds: fetchFeeds
    };
};
