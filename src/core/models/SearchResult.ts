import { Post } from './models';
import { User } from './models';

export default class SearchResult {
  public posts: Post[];
  public postsCount: number;
  public totalPostsCount: number;
  public profiles: User[];
  public profilesCount: number;
  public totalProfilesCount: number;
}
