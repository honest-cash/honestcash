export type TPostTypeId = "comment" | "article" | "response";

export interface IFetchPostsArgs {
  orderBy?: "upvoteCount" | "unlockCount" | "publishedAt";
  userId?: number;
  hashtag?: string;
  page?: number;
  includeResponses?: boolean;
  includeParentPost?: boolean;
  status?: "published" | "draft" | "archived" | "locked" | "unlocked";
  isResponse?: boolean;
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

export class Unlock {
  public txId: string;
  public userPostId: number;
  public userId: number;
  public user: User;
  public userPost: Post;
  public createdAt: string;
  public createdAtFormatted: string;
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
  status: "draft" | "published" | "archived";
  postTypeId: TPostTypeId;
  parentPostId: number;
  createdAt: string;
  createdAtFormatted: string;
  updatedAt: string;
  updatedAtFormatted: string;
  publishedAt: string;
  publishedAtFormatted: string;
  deletedAt: string;
  archivedAtFormatted: string;
  userPosts?: Post[];
  userPostRefs: any;
  hasPaidSection?: boolean;
  paidSectionCost?: number;
  hasBeenPaidFor?: boolean;
  isOwner?: boolean;
}
