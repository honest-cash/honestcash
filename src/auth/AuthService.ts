import { IHttpService, IQService, IWindowService } from "angular";
import { SHA3 } from "sha3";
import * as logger from "../core/lib/logger";
import { User } from "../core/models/models";
export class AuthService {
  public static $inject = [
    "$window",
    "$http",
    "$q",
    "apiFactory"
  ];

  public username: string = "";
  public isAuthenticated: boolean = false;
  public authToken: string;
  public authUserId: number;

  public LOCAL_TOKEN_KEY = "HC_USER_TOKEN";
  public LOCAL_USER_ID_KEY = "HC_USER_ID";
  public LOCAL_USER = "HC_CASH_USER";

  constructor(
    private $window: IWindowService,
    private $http: IHttpService,
    private $q: IQService,
    private apiFactory
  ) {}

  public getUserId = () => this.authUserId;

  public useCredentials(token: string, userId: number) {
    this.isAuthenticated = true;
    this.authToken = token;
    this.authUserId = userId;
    this.$http.defaults.headers.common["X-Auth-Token"] = token;
  }

  public loadUserCredentials(): void {
    const token = this.$window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
    const userId = Number(this.$window.localStorage.getItem(this.LOCAL_USER_ID_KEY));

    if (token) {
      this.useCredentials(token, userId);
    }
  }

  public storeUserCredentials(token: string, userId: number): void {
    this.$window.localStorage.setItem(this.LOCAL_TOKEN_KEY, token);
    this.$window.localStorage.setItem(this.LOCAL_USER_ID_KEY, userId);

    this.useCredentials(token, userId);
  }

  public destroyUserCredentials(): void {
    this.authToken = undefined;
    this.authUserId = undefined;
    this.isAuthenticated = false;
    this.$http.defaults.headers.common["X-Auth-Token"] = undefined;
    this.$window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
    this.$window.localStorage.removeItem(this.LOCAL_USER_ID_KEY);
  }

  public async login(data: { email: string, password: string }) {
      const res = await this.$http.post<{ token: string; user: User; wallet: any }>(this.apiFactory("LOGIN"), data);

      this.storeUserCredentials(res.data.token, res.data.user.id);

      return res.data;
  }

  public passwordCheck(data: { password: string }) {
    return this.$q((resolve, reject) => {
      this.$http
      .post(this.apiFactory("PASSWORD_CHECK"), data)
      .then((res) => {
        resolve(res.data);
      }, reject);
    });
  }

  public async signup(data: {
    username: string;
    password: string;
    email: string;
    userType: number;
    captcha: string;
  }) {
      const response = await this.$http.post<{ token: string; user: any; }>(this.apiFactory("SIGNUP"), data);
      const authData = response.data;

      this.storeUserCredentials(authData.token, authData.user.id);

      return authData;
  }

  public async validate() {
    return this.$http.get(this.apiFactory("VALIDATE"));
  }

  public async logout() {
    this.destroyUserCredentials();

    return this.$http.post(this.apiFactory("LOGOUT"), {});
  }

  public async resetPassword(data: { email: string }) {
    return this.$http.post(this.apiFactory("RESET"), data);
  }

  public async changePassword(data: {
    email: string;
    code: string,
    newPassword: string,
    repeatNewPassword: string;
    mnemonicEncrypted: string;
  }) {
    return this.$http.post(this.apiFactory("CHANGE_PASSWORD"), data);
  }

  public async setPassword(data: { password: string }) {
    return this.$http.post(this.apiFactory("SET_PASSWORD"), data);
  }

  public async setWallet(data: { mnemonicEncrypted: string }) {
    return this.$http.post(this.apiFactory("SET_WALLET"), data);
  }

  public async getEmails(): Promise<string[]> {
    const res = await this.$http.get<string[]>(this.apiFactory("GET_EMAILS"));

    return res.data;
  }

  public getAuthToken = () => {
    return this.authToken;
  }

  public calculatePasswordHash(email: string, password: string): string {
    return this.calculateSHA3Hash(
      this.determineMessageForHashing(email, password)
    );
  }

  public determineMessageForHashing(salt: string, password: string): string {
    return `${salt}:${password}`;
  }

  public calculateSHA3Hash(message: string): string {
    const hash = new SHA3(512);
    const passwordHash = hash.update(message).digest("hex");

    return passwordHash;
  }
}
