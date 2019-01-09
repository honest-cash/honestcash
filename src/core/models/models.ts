export type TPostTypeId = "comment" | "article" | "response";
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
  body: string;
  user: User;
  postTypeId: TPostTypeId;
  parentPostId: number;
  createdAt: string;
  publishedAt: string;
  userPosts?: Post[]
}
