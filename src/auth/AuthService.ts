import { SHA3 } from "sha3";
export class AuthService {
  constructor(
    private $window,
    private $http,
    private $q,
    private apiFactory
  ) {}

  public getUserId = () => this.authUserId;
  public username: string = '';
  public isAuthenticated: boolean = false;
  public authToken: string;
  public authUserId: number;

  public LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';
  public LOCAL_USER_ID_KEY = 'HC_USER_ID';
  public LOCAL_USER = 'HC_CASH_USER';

  public useCredentials(token: string, userId: number) {
    this.isAuthenticated = true;
    this.authToken = token;
    this.authUserId = userId;
    this.$http.defaults.headers.common['X-Auth-Token'] = token;
  }

  public loadUserCredentials(): void {
    const token = this.$window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
    const userId = this.$window.localStorage.getItem(this.LOCAL_USER_ID_KEY);

    if (token) {
      this.useCredentials(token, userId);
    }
  }

  public storeUserCredentials(token: string, userId: number): void {
    this.$window.localStorage.setItem(this.LOCAL_USER_ID_KEY, userId);
    this.$window.localStorage.setItem(this.LOCAL_TOKEN_KEY, token);

    this.useCredentials(token, userId);
  }

  public destroyUserCredentials(): void {
    this.authToken = undefined;
    this.authUserId = undefined;
    this.isAuthenticated = false;
    this.$http.defaults.headers.common['X-Auth-Token'] = undefined;
    this.$window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
    this.$window.localStorage.removeItem(this.LOCAL_USER_ID_KEY);
  }

  public login(data: { email: string, password: string }) {
    return this.$q((resolve, reject) => {
      this.$http.post(this.apiFactory("LOGIN"), data)
      .then((res) => {
        this.storeUserCredentials(res.data.token, res.data.user.id);

        resolve(res.data);
      }, reject);
    });
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

  public signup(data: { username: string; password: string; email: string }) {
    return this.$q(async (resolve, reject) => {
      this.$http.post(this.apiFactory("SIGNUP"), data)
      .then(response => {
        this.storeUserCredentials(response.data.token, response.data.user.id);

        resolve(response.data);
      }, reject);
    });
  }

  public validate(callback) {
    return this.$http.get(this.apiFactory("VALIDATE"))
  }

  public logout() {
    this.destroyUserCredentials();

    this.$http.post(this.apiFactory("LOGOUT")).then((data) => {
      console.log("Tokens destroyed.")
    });
  }

  public resetPassword(data: { email: string }) {
    return this.$http.post(this.apiFactory("RESET"), data);
  }

  public changePassword(data: {
    code: string,
    newPassword: string,
    repeatNewPassword: string;
    mnemonicEncrypted: string;
  }) {
    return this.$http.post(this.apiFactory("CHANGE_PASSWORD"), data);
  }

  public setPassword(data: { password: string }) {
    return this.$http.post(this.apiFactory("SET_PASSWORD"), data);
  }

  public setWallet(data: { mnemonicEncrypted: string }) {
    return this.$http.post(this.apiFactory("SET_WALLET"), data);
  }

  public async getEmails(): Promise<string[]> {
    const res = await this.$http.get(this.apiFactory("GET_EMAILS"));

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
    const passwordHash = hash.update(message).digest('hex');

    return passwordHash;
  }

  static $inject = [ "$window", "$http", "$q", "apiFactory" ];
}
