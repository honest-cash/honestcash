import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../index';
import {Router} from '@angular/router';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../../app/auth/models/authentication';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app/app.states';
import User from '../../../app/user/models/user';
import {AuthService, LOCAL_TOKEN_KEY, LOCAL_USER_ID_KEY} from './auth.service';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorageToken} from '../../helpers/localStorage';
import {UserLoaded} from '../../../app/user/store/user.actions';

export const API_ENDPOINTS = {
  getCurrentUser: `/me`,
};

@Injectable({providedIn: 'root'})
export class UserService {

  private token = '';
  private userId: number;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private store: Store<AppStates>,
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public init(token?: string, _user?: User) {
    if (token) {
      this.setToken(token);
      if (_user) {
        this.setUserId(_user.id);
        this.store.dispatch(new UserLoaded({user: _user}));
      }
      this.authService.authenticate();
    } else if (this.getToken()) {
      this.getCurrentUser().subscribe((user: User) => {
        this.store.dispatch(new UserLoaded({user}));
        this.setUserId(user.id);
        this.authService.authenticate();
      });
    }
  }

  public getToken(): string {
    let token;
    if (!this.token && this.isPlatformBrowser && (token = this.localStorage.getItem(LOCAL_TOKEN_KEY))) {
      this.token = token;
    }
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    if (this.isPlatformBrowser) {
      this.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    }
  }

  // needed for the v1 integration, @todo, review its use after.
  public setUserId(userId: number) {
    this.userId = userId;

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
    if (this.isPlatformBrowser && !this.userId) {
      return parseInt(this.localStorage.getItem(LOCAL_USER_ID_KEY), 10);
    }
    return this.userId;
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
}
