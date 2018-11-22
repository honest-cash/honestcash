export default class HashtagService {
    constructor ($http, API_URL) {
        const defaultHashtags = [
            "general",
            "bitcoin",
            "crypto",
            "ann",
            "trading",
            "economics",
            "politics",
            "altcoin",
            "dev"
        ];

        return {
            defaultHashtags
        }
    }
}

HashtagService.$inject = [
    "$http", "API_URL"
];
