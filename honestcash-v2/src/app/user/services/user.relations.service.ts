import {Injectable} from '@angular/core';
import {UserSharedModule} from '../user-shared.module';
import {HttpService} from '../../../core/http/http.service';
import {UserModule} from '../user.module';


export const API_ENDPOINTS = {
  followUser: (id: number) => `/user/${id}/follow`,
  unfollowUser: (id: number) => `/user/${id}/unfollow`,
  getFollowerUsersOfUser: (id: number) => `/user/${id}/followers`,
  getFollowingUsersOfUser: (id: number) => `/user/${id}/following`,
};

@Injectable()
export class UserRelationsService {

  constructor(
    private http: HttpService,
  ) {
  }

  public followUser(userId: number) {
    return this.http.post(API_ENDPOINTS.followUser(userId), {});
  }
  public unfollowUser(userId: number) {
    return this.http.post(API_ENDPOINTS.unfollowUser(userId), {});
  }

  public getFollowerUsersOfUser(userId: number) {
    return this.http.post(API_ENDPOINTS.getFollowerUsersOfUser(userId), {});
  }

  public getFollowingUsersOfUser(userId: number) {
    return this.http.post(API_ENDPOINTS.getFollowingUsersOfUser(userId), {});
  }
}
