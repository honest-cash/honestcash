export type TPostTypeId = "comment" | "article" | "response";

export interface IFetchPostsArgs {
  orderBy?: "upvoteCount" | "publishedAt";
  userId?: number;
  hashtag?: string;
  page?: number;
  includeResponses?: boolean;
  status?: "published" | "draft";
}

export interface IFetchFeedsArgs {
  followerId?: number;
  until?: string;
}

export class User {
  public id: number;
  public username: string;
  public imageUrl: string;
  public addressBCH: string;
  public addressSLP: string;
}

export class Upvote {
  public txId: string;
  public userPostId: number;
  public userId: number;
  public user: User;
}

export class Post {
  id: number;
  title: string;
  alias: string;
  body: string;
  bodyMD: string;
  plain: string;
  user: User;
  userId: number;
  shareURLs: any;
  postTypeId: TPostTypeId;
  parentPostId: number;
  createdAt: string;
  createdAtRaw: string;
  publishedAt: string;
  userPosts?: Post[];
  userPostRefs: any;
}
