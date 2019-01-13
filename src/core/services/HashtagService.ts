import { IHashtagStat } from '../lib/interfaces';

export default class HashtagService {
  constructor (
    private $http,
    private API_URL
  ) {}

  private hashtags: IHashtagStat[];

  public async getTopHashtags(): Promise<IHashtagStat[]> {
    if (!this.hashtags) {
      const res = await this.$http.get(this.API_URL + "/hashtag");

      this.hashtags = res.data;
    }

    return this.hashtags;
  };

  static $inject = [
    "$http",
    "API_URL"
  ];
}
