import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService, Logger} from '../../core';
import {Router} from '@angular/router';
import {LoginSuccessResponse, SignupSuccessResponse} from '../models/authentication';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';
import User from '../models/user';

const log = new Logger('UserService');

export const API_ENDPOINTS = {
  status: `/me`,
};

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private store: Store<AppStates>,
    private router: Router,
    private http: HttpService,
  ) {
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

  public getMe(): Observable<User> {
    return this.http.get<User>('/me');
  }
}
