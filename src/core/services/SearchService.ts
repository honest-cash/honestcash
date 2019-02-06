import SearchResult from "../models/SearchResult";

export default class SearchService {
   public static $inject = [
    "$http",
    "API_URL"
  ];

  constructor(
    private $http: ng.IHttpService,
    private API_URL: string
  ) {}

  public async getSearchResults(params: {
    term: string,
    page: number
  }): Promise<SearchResult> {
    const res = await this.$http({
      method: "GET",
      params,
      url: this.API_URL + "/search"
    });

    return res.data as SearchResult;
  }
}
