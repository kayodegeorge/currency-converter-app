import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.freecurrencyapi.com/v1/latest';
  private apikey = environment.currencyApiKey;

  constructor(private http: HttpClient) {}

  getConversionRates(baseCurrency: string): Observable<any> {
    const params = {
      apikey: environment.currencyApiKey,
      base_currency: baseCurrency,
    };
    return this.http.get(`${this.apiUrl}`, { params });
  }

  getExchangeRates(
    baseCurrency: string,
    targetCurrency: string,
    amount: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('base_currency', baseCurrency)
      .set('currencies', targetCurrency)
      .set('apikey', this.apikey);

    return this.http.get(this.apiUrl, { params });
  }
}
