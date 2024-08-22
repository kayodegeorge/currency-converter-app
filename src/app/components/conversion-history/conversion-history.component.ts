import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-conversion-history',
  templateUrl: './conversion-history.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule], // Include IonicModule here
  providers: [CurrencyService],
})
export class ConversionHistoryComponent {
  @Input() histories: any[] = [];
  constructor() {}
}
