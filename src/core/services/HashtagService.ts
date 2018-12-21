interface IHashtagStat {
  hashtag: string;
  count: number;
}
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

      const getTopHashtags = async (): Promise<IHashtagStat[]> => {
        const res = await $http.get(API_URL + "/hashtag");

        return res.data;
      };
      
      return {
        getTopHashtags,
        defaultHashtags
      };
    }
}

HashtagService.$inject = [
    "$http", "API_URL"
];
