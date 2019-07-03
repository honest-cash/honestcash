import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../auth/models/authentication';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';
import User from '../models/user';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {UserLoaded} from '../store/user.actions';
import {HttpService} from '../../../core/http/http.service';
import {UserModule} from '../user.module';
import {UserSharedModule} from '../user-shared.module';

export const LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';
export const LOCAL_USER_ID_KEY = 'HC_USER_ID';

export const API_ENDPOINTS = {
  getCurrentUser: `/me`,
  followUser: (id: number) => `/user/${id}/follow`,
  unfollowUser: (id: number) => `/user/${id}/unfollow`,
  getFollowerUsersOfUser: (id: number) => `/user/${id}/followers`,
  getFollowingUsersOfUser: (id: number) => `/user/${id}/following`,
};

@Injectable({providedIn: UserSharedModule})
export class UserService {

  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private store: Store<AppStates>,
    private router: Router,
    private http: HttpService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public init(payload?: {token?: string, user?: User}) {
    if (payload && payload.token) {
      this.setToken(payload.token);
      if (payload.user) {
        this.setUserId(payload.user.id);
        this.store.dispatch(new UserLoaded({user: payload.user}));
      }
    } else if (this.getToken()) {
      this.getCurrentUser().subscribe((user: User) => {
        this.store.dispatch(new UserLoaded({user}));
        this.setUserId(user.id);
      });
    }
  }

  public getToken(): string | undefined {
    if (this.isPlatformBrowser) {
      const token = this.localStorage.getItem(LOCAL_TOKEN_KEY);
      return token ? token : undefined;
    }
  }

  public setToken(token: string) {
    if (this.isPlatformBrowser) {
      this.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    }
  }

  // needed for the v1 integration, @todo, review its use after.
  public setUserId(userId: number) {
    if (this.isPlatformBrowser) {
      this.localStorage.setItem(LOCAL_USER_ID_KEY, String(userId));
    }
  }

  public unsetUser() {
    if (this.isPlatformBrowser) {
      this.localStorage.removeItem(LOCAL_TOKEN_KEY);
      this.localStorage.removeItem(LOCAL_USER_ID_KEY);
    }
  }


  public getUserId(): number | undefined {
    if (this.isPlatformBrowser) {
      return parseInt(this.localStorage.getItem(LOCAL_USER_ID_KEY), 10);
    }
  }

  public checkAddressBCH(payload: LoginSuccessResponse | SignupSuccessResponse) {
    // api req to SET_WALLET with sw.mnemonicEncrypted
    /* // if user has no bch address and no wallet: updateUser(
          authData.user.id,
          "addressBCH",
          sbw.address,
        ) */
    /* const data = {};

    data[fieldName] = fieldValue;

    return this.$http.put(`${this.API_URL}/user/${userId}`, data); */
    // else has a wallet but no bch address
    // await this.setAddressForTips(authData.user.id.toString(), sbw.address);

    /* private setAddressForTips = async (userId: string, bchAddress: string) => {
      const hasConfirmed = await sweetalert({
        title: "Receiving tips",
        text: `Would you like to also receive tips to the same wallet?` +
        ` You can always change it in your profile.`,
        type: "warning",
        buttons: {
          cancel: true,
          confirm: true,
        },
      });

      if (hasConfirmed) {
        await this.profileService.updateUser(
          Number(userId),
          "addressBCH",
          bchAddress,
        );
      }
    } */
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(API_ENDPOINTS.getCurrentUser);
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
