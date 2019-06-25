import User from './user';
import Hashtag from './hashtag';
import {Block} from '../../modules/editor/shared/json-to-html';

export type TPostTypeId = 'comment' | 'article' | 'response';

export default class Post {
  public id: number;
  public title: string;
  public alias: string;
  public body: string | any[] | Block[];
  public bodyMD: string;
  public bodyJSON: Block[];
  public plain: string;
  public user: User;
  public userId: number;
  public shareURLs: any;
  public status: 'draft' | 'published' | 'archived';
  public postTypeId: TPostTypeId;
  public parentPostId: number;
  public parentPost: Post;
  public createdAt: string;
  public createdAtFormatted: string;
  public updatedAt: string;
  public updatedAtFormatted: string;
  public publishedAt: string;
  public publishedAtFormatted: string;
  public deletedAt: string;
  public archivedAtFormatted: string;
  public userPosts?: Post[];
  public userPostRefs: any;
  public userPostHashtags?: Hashtag[] | string;
  public hashtags?: Hashtag[];
  public hasPaidSection?: boolean;
  public paidSectionCost?: number;
  public hasBeenPaidFor?: boolean;
  public paidSectionLinebreak?: number;
  public isOwner?: boolean;
}

export interface PostSaveSuccessResponse {
  story: Post;
}
