import moment from "moment";
import { Post, Upvote } from "../models/models";
export default class PostService {
  constructor (
    private $http,
    private $sce,
    private API_URL
  ) {}

  private postDateFormat = "MMM Do YY";

  public removePost(postId) {
    return this.$http.delete(this.API_URL + "/post/" + postId);
  };

  public publishPic(postId, params, callback) {
    this.$http.put(this.API_URL + "/post/image/publish", {
      postId: postId,
      tags: params.hashtags
    }).then((response) => {
      callback(response.data);
    });
  };

  public upvote(upvote) {
      return this.$http.post(this.API_URL + "/post/" + upvote.postId + "/upvote", {
          txId: upvote.txId,
          postId: upvote.postId
      })
  }

  public createRef(ref) {
      return this.$http.post(this.API_URL + "/post/" + ref.postId + "/ref", {
          extId: ref.extId,
          postId: ref.postId
      });
  };

  private processPost(post: Post): Post {
    post.createdAt = moment(post.createdAt).format(this.postDateFormat);
    post.publishedAt = moment(post.publishedAt).format(this.postDateFormat);

    post.userPosts && post.userPosts.forEach(userPost => {
      userPost = this.processPost(userPost);
    });

    return post;
  }

  public async createPost(post: Post): Promise<Post> {
    const res = await this.$http.post(`${this.API_URL}/post`, post);

    return this.processPost(res.data);
  }

  public displayHTML(html: string): string {
    return this.$sce.trustAsHtml(html);
  }

  public async getById(postId: number): Promise<Post> {
    const res = await this.$http.get(this.API_URL + "/post/" + postId);
      
    return this.processPost(res.data);
  };

  public async getByAlias(username, alias): Promise<Post> {
    const res = await this.$http.get(this.API_URL + "/post/" + username + "/" + alias);

    return this.processPost(res.data);
  };

  public async getUpvotes(postId: number) : Promise<Upvote[]> {
    const res = await this.$http.get(this.API_URL + "/post/" + postId + "/upvotes");

    return res.data;
  };

  public async getResponses(postId: number) : Promise<Post[]> {
    const res = await this.$http.get(this.API_URL + "/post/" + postId + "/responses");

    return res.data.map(post => this.processPost(post));
  };

  static $inject = [
    "$http",
    "$sce",
    "API_URL"
  ];
}
