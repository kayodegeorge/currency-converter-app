import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ConversionFormComponent } from './components/conversion-form/conversion-form.component';
import { ConversionHistoryComponent } from './components/conversion-history/conversion-history.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ConversionFormComponent,
    ConversionHistoryComponent,
  ], // Add the standalone components here
})
export class AppComponent {
  conversionHistory: any[] = [];

  addConversion(conversion: any) {
    if (this.conversionHistory.length === 3) {
      this.conversionHistory.shift();
    }
    this.conversionHistory.push(conversion);
  }
}
