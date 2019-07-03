import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpService} from '../../../core/http/http.service';
import {Observable, of} from 'rxjs';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {isPlatformBrowser} from '@angular/common';


export interface CoinbaseExchangeResponse {
  data: {
    currency: string;
    rates: any;
  };
}

export const EXCHANGE_RATE_CACHE_KEY = 'EXCHANGE_RATES';

export const API_ENDPOINTS = {
  convertCurrency: (sourceCurrency: string) => `https://api.coinbase.com/v2/exchange-rates?currency=${sourceCurrency.toUpperCase()}`
};

@Injectable({providedIn: 'root'})
export class CurrencyService {

  private readonly isPlatformBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  public async cacheExchangeRates() {
    if (this.isPlatformBrowser) {
      const request = this.http.get<CoinbaseExchangeResponse>(API_ENDPOINTS.convertCurrency('usd'));
      const response: CoinbaseExchangeResponse = await request.toPromise();
      this.localStorage.setItem(EXCHANGE_RATE_CACHE_KEY, JSON.stringify(response));
    }
  }

  public convertCurrency(amount: number, sourceCurrency: string, targetCurrency: string): Observable<number> {
    if (this.isPlatformBrowser) {
      const exchangeRateCache = JSON.parse(this.localStorage.getItem(EXCHANGE_RATE_CACHE_KEY));
      const convertedCurrency = this.calculateRate(amount, exchangeRateCache.data.rates, targetCurrency);
      return of(convertedCurrency);
    }
  }

  public calculateRate(amount: number, rates: number[], targetCurrency: string): number {
    const rate = rates[targetCurrency.toUpperCase()];
    return Number(Number((Number(rate) * Number(amount))));
  }
}
