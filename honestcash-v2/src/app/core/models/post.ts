import User from './user';
import Hashtag from './hashtag';

export type TPostTypeId = 'comment' | 'article' | 'response';

export default class Post {
    id: number;
    title: string;
    alias: string;
    body: string;
    bodyMD: string;
    plain: string;
    user: User;
    userId: number;
    shareURLs: any;
    status: 'draft' | 'published' | 'archived';
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
    userPostHashtags?: Hashtag[];
    hasPaidSection?: boolean;
    paidSectionCost?: number;
    hasBeenPaidFor?: boolean;
    paidSectionLinebreak?: number;
    isOwner?: boolean;
  }
