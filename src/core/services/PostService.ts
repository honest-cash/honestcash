import moment from "moment";
import { dateFormat } from "../../core/config/index";
import SocialSharing from "../lib/SocialSharing";
import { IFetchPostsArgs, Post, Upvote } from "../models/models";

export default class PostService {
  public static $inject = [
    "$http",
    "$sce",
    "API_URL"
  ];

  constructor(
    private $http,
    private $sce,
    private API_URL
  ) {}

  public removePost(postId) {
    return this.$http.delete(this.API_URL + "/post/" + postId);
  }

  public publishPic(postId, params, callback) {
    this.$http.put(this.API_URL + "/post/image/publish", {
      postId,
      tags: params.hashtags
    }).then((response) => {
      callback(response.data);
    });
  }

  public upvote(upvote) {
    return this.$http.post(this.API_URL + "/post/" + upvote.postId + "/upvote", {
      postId: upvote.postId,
      txId: upvote.txId
    });
  }

  public createRef(ref) {
      return this.$http.post(this.API_URL + "/post/" + ref.postId + "/ref", {
          extId: ref.extId,
          postId: ref.postId
      });
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
  }

  public async getByAlias(username, alias): Promise<Post> {
    const res = await this.$http.get(this.API_URL + "/post/" + username + "/" + alias);

    return this.processPost(res.data);
  }

  public async getUpvotes(postId: number) : Promise<Upvote[]> {
    const res = await this.$http.get(this.API_URL + "/post/" + postId + "/upvotes");

    return res.data;
  }

  public async getResponses(postId: number) : Promise<Post[]> {
    const res = await this.$http.get(this.API_URL + "/post/" + postId + "/responses");

    return res.data.map((post) => this.processPost(post));
  }

  public getPosts(query: IFetchPostsArgs, callback) {
    this.$http({
      method: "GET",
      params: query,
      url: this.API_URL + "/posts"
    }).then((response) => {
      const feeds = response.data;

      for (const feed of feeds) {
        feed.shareURLs = SocialSharing.getFeedShareURLs(feed);
        feed.createdAtFormatted = moment(feed.createdAt).format("MMM Do YY");
        feed.publishedAtFormatted = moment(feed.publishedAt).format("MMM Do YY");
      }

      callback(feeds);
    });
  }

  private processPost(post: Post): Post {
    post.createdAt = moment(post.createdAt).format(dateFormat);
    post.publishedAt = moment(post.publishedAt).format(dateFormat);
    post.shareURLs = SocialSharing.getFeedShareURLs(post);

    if (post.userPosts) {
      post.userPosts.forEach((userPost) => {
        userPost = this.processPost(userPost);
      });
    }

    return post;
  }
}
