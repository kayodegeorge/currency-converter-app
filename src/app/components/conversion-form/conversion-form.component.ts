import { Component, EventEmitter, Output } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
interface ConversionResults {
  [currencyCode: string]: number;
}

@Component({
  selector: 'app-conversion-form',
  templateUrl: './conversion-form.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, HttpClientModule, CommonModule], // Include IonicModule here
  providers: [CurrencyService],
})
export class ConversionFormComponent {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  conversionResults: ConversionResults | null = null;
  conversionHistory: any[] = [];

  @Output() conversion = new EventEmitter<any>();

  constructor(
    private currencyService: CurrencyService,
    private http: HttpClient
  ) {}

  convertCurrency() {
    const apiUrl = 'https://api.freecurrencyapi.com/v1/latest';
    const apiKey = 'fca_live_be2l4Aw8I14gkyQpFw33OAijwu5HLKMIpop8uUJ6';

    const headers = new HttpHeaders({
      apikey: apiKey,
    });

    const params = {
      base_currency: this.fromCurrency,
      currencies: this.toCurrency,
    };

    const validCurrencies = [
      'AUD',
      'BGN',
      'BRL',
      'CAD',
      'CHF',
      'CNY',
      'CZK',
      'DKK',
      'EUR',
      'GBP',
      'HKD',
      'HRK',
      'HUF',
      'IDR',
      'ILS',
      'INR',
      'ISK',
      'JPY',
      'KRW',
      'MXN',
      'MYR',
      'NOK',
      'NZD',
      'PHP',
      'PLN',
      'RON',
      'RUB',
      'SEK',
      'SGD',
      'THB',
      'TRY',
      'USD',
      'ZAR',
    ];
    if (!validCurrencies.includes(this.fromCurrency)) {
      alert('The selected base currency is invalid.');
      return;
    }

    this.http.get(apiUrl, { headers, params }).subscribe(
      (response: any) => {
        this.conversionResults = response.data;
        // CONSOLE('Conversion successful');
        this.conversionResults = response.data;

        this.addConversionToHistory({
          fromCurrency: this.fromCurrency,
          toCurrency: this.toCurrency,
          amount: this.amount,
          result: response.data,
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Conversion failed', error);
        if (error.status === 0) {
          alert(
            'Unable to connect to the server. Please check your network connection or CORS settings.'
          );
        } else {
          alert(`An error occurred: ${error.message}`);
        }
      }
    );
  }
  addConversionToHistory(conversion: any) {
    this.conversionHistory.unshift(conversion);
    if (this.conversionHistory.length > 3) {
      this.conversionHistory.pop(); // Remove the oldest conversion if more than 3
    }
  }
}
