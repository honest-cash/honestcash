import {TestBed} from '@angular/core/testing';
import {API_ENDPOINTS, CoinbaseExchangeResponse, CurrencyService, EXCHANGE_RATE_CACHE_KEY} from './currency.service';
import {of} from 'rxjs';
import {HttpService} from '../../../core/http/http.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../mock';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';

describe('CurrencyService', () => {
  let mockHttpService: HttpService;
  let currencyService: CurrencyService;

  beforeEach(() => {
    mockHttpService = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CurrencyService,
        {provide: HttpService, useValue: mockHttpService},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
      ]
    });
    currencyService = TestBed.get(CurrencyService);
  });

  afterEach(() => {
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(currencyService).toBeDefined();
    });
  });

  describe('cacheExchangeRates should', () => {
    it('call Coinbase API to get the results', async () => {
      const coinbaseResultMock: CoinbaseExchangeResponse = {
        data: {
          currency: 'BCH',
          rates: {
            'USD': 1.4
          }
        }
      };
      (<jasmine.Spy>mockHttpService.get).and.returnValue(of(coinbaseResultMock));
      localStorage.removeItem(EXCHANGE_RATE_CACHE_KEY);
      await currencyService.cacheExchangeRates();
      expect(localStorage.getItem(EXCHANGE_RATE_CACHE_KEY)).toBeDefined();
      expect(mockHttpService.get)
        .toHaveBeenCalledWith(API_ENDPOINTS.convertCurrency('usd'));
    });
  });

  describe('convertCurrency should', () => {
    it('get exchangeRates from localStorage and call calculateRate to return the convertedCurrency', (done) => {
      const calculateRateSpy = spyOn(currencyService, 'calculateRate').and.callThrough();
      const usdRate = 1.3;
      const bchBalance = 0.0005;
      const coinbaseResultMock: CoinbaseExchangeResponse = {
        data: {
          currency: 'BCH',
          rates: {
            'USD': usdRate
          }
        }
      };
      localStorage.setItem(EXCHANGE_RATE_CACHE_KEY, JSON.stringify(coinbaseResultMock));
      currencyService.convertCurrency(bchBalance, 'bch', 'usd').subscribe((response: number) => {
        expect(calculateRateSpy).toHaveBeenCalled();
        expect(response).toEqual(usdRate * bchBalance);
        done();
      });
    });
  });

  describe('calculateRate should', () => {
    it('return the calculated rate correctly', () => {
      const usdRate = 1.3;
      const bchBalance = 0.0005;
      const coinbaseResultMock: CoinbaseExchangeResponse = {
        data: {
          currency: 'BCH',
          rates: {
            'USD': usdRate
          }
        }
      };

      const calculateRateResult = currencyService.calculateRate(bchBalance, coinbaseResultMock.data.rates, 'usd');
      expect(calculateRateResult).toEqual(usdRate * bchBalance);
    });
  });

});

