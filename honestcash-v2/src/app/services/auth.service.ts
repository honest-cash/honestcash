import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '@models/user';
import {environment} from '../../environments/environment';
import {CryptoUtils} from '../shared/lib/CryptoUtils';
import { HttpService } from '@app/core';

export interface ILogInResponse {
  user: User;
  wallet: any;
  token: string;
}

@Injectable()
export class AuthService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpService) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public logIn(email: string, password: string): Observable<ILogInResponse> {
    const url = `${this.BASE_URL}/login`;

    const passwordHash = CryptoUtils.calculatePasswordHash(email, password);

    return this.http.post<ILogInResponse>(url, {email, password: passwordHash});
  }

  public signUp(payload: {
    email: string;
    password: string;
    username: string;
    captcha: string;
  }): Observable<User> {
    const url = `${this.BASE_URL}/signup/email`;

    const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);

    return this.http.post<User>(url, {
      username: payload.username,
      email: payload.email,
      password: passwordHash,
      captcha: payload.captcha
    });
  }

  public resetPassword(email: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;

    return this.http.post<User>(url, {
      email
    });
  }

  public changePassword(data: {
    email: string;
    code: string,
    newPassword: string,
    repeatNewPassword: string;
    mnemonicEncrypted: string;
  }) {
    return this.http.post(`${this.BASE_URL}/auth/reset-password"`, data);
  }

  public getMe() {
    return this.http.get<User>(`${this.BASE_URL}/me`);
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
