interface ISoundCloudOEmbedRequestResult {
  data: {
    html?: string;
  };
}

export default class SoundcloudService {

  public static $inject = [
    "$http",
  ];

  constructor(
    private $http: ng.IHttpService,
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {}

  public async getIframe(link: string):
  Promise<ISoundCloudOEmbedRequestResult> {
    const res = await this.$http.get(
      `http://soundcloud.com/oembed?format=json&url=${link}&iframe=true`,
    );
    return res;
  }

}
