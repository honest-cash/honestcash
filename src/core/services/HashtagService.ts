class HashtagStat {
  hashtag: string;
  count: number;
}
export default class HashtagService {
  constructor (
    private $http,
    private API_URL
  ) {}

  public async getTopHashtags(): Promise<HashtagStat[]> {
    const res = await this.$http.get(this.API_URL + "/hashtag");

    return res.data;
  };

  static $inject = [
    "$http", "API_URL"
  ];
}
