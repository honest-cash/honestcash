import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces';
import { BehaviorSubject } from 'rxjs';
import { Logger, HttpService } from '../../core';
import { Router } from '@angular/router';
import { LoginResponse, SignupResponse} from './authentication.interfaces';
import { WalletService } from './wallet.service';
import { Store } from '@ngrx/store';
import { AppStates, selectUserState } from '../../app.states';

const log = new Logger('UserService');

@Injectable({providedIn: 'root'})
export class UserService {
  private user: BehaviorSubject<User | undefined> = new BehaviorSubject(undefined);
  private user$;

  constructor(
    private store: Store<AppStates>,
    private router: Router,
    private httpService: HttpService,
    private walletService: WalletService,
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  public getUser() {
    return this.user;
  }

  public checkAddressBCH(payload: LoginResponse | SignupResponse) {
    return this.user$.subscribe(({user}) => {
      if (!user) {
        return;
      }

      if (!user.addressBCH) {
        const wallet = this.walletService.getWallet();
      }
    });

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

  private getMe() {
    this.httpService.get('/me').subscribe(
      (user: User) => {
        this.user.next(user);
      },
      error => {
        log.error(error);
        this.router.navigate(['/http-error']);
      }
    );
  }
}
