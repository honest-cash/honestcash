export interface Post {
  id: number;
  body: string;
  bodyMD: string;
  title: string;
  status: 'draft' | 'published';
  userPostHashtags: any[];
  hashtags: string; // for setting up the hashtags,
  userId: number;
  parentPostId: number;
  parentPost: Post;
  hasPaidSection: boolean;
  paidSectionLinebreak: number;
  paidSectionCost: number;
}

export interface User {
  id: number;
  username: string;
  imageUrl: string;
  addressBCH: string;
}
