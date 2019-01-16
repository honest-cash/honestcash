export type TPostTypeId = "comment" | "article" | "response";

export interface IFetchPostsArgs {
  orderBy?: "upvoteCount";
  userId?: number;
  followerId?: number;
  hashtag?: string;
  limit?: number;
  until?: string;
  page?: number;
}

export interface IFetchFeedsArgs {
  followerId?: number;
  until?: string;
}

export class User {
  id: number;
  username: string;
  imageUrl: string;
  addressBCH: string;
}

export class Upvote {
  txId: string;
  userPostId: number;
  userId: number;
  user: User;
}
export class Post {
  id: number;
  title: string;
  alias: string;
  body: string;
  plain: string;
  user: User;
  shareURLs: any;
  postTypeId: TPostTypeId;
  parentPostId: number;
  createdAt: string;
  publishedAt: string;
  userPosts?: Post[]
}
