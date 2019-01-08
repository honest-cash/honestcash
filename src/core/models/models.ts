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
  createdAt: string;
  publishedAt: string;
  userPosts?: Post[]
}
