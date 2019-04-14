import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '@models/user';
import {environment} from '../../environments/environment';
import {CryptoUtils} from '../shared/lib/CryptoUtils';

@Injectable()
export class AuthService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;

    const passwordHash = CryptoUtils.calculatePasswordHash(email, password);

    return this.http.post<User>(url, {email, password: passwordHash});
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {email, password});
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
