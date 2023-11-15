import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MyApiService } from './services/api';
import { Rate } from './models/Rate';
import { ConversionComponent } from './components/conversion/conversion.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ConversionComponent, NgIf],
  template: `
    <div class="container mx-auto">
      @if(ready){
      <app-header [USD]="USD.rate" [EUR]="EUR.rate" />
      <app-conversion [data]="data" />
      } @else {
      <div>Loading...</div>
      }
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(private myApi: MyApiService) {}

  title = 'test';
  data: Rate[] = [];
  ready = false;
  USD = new Rate('Долар США', 0.0, 'USD');
  EUR = new Rate('Евро', 0.0, 'EUR');
  UAH = new Rate('Ураїнська гривня', 1, 'UAH');

  ngOnInit() {
    this.myApi.getData().subscribe({
      next: (resp: Rate[]) => {
        if (resp.length > 1) {
          this.sortByPop(resp);
          resp.unshift(this.UAH);
          this.USD = resp[1];
          this.EUR = resp[2];
          this.data = resp;
          this.ready = true;
        }
      },
    });
  }

  sortByPop = (data: Rate[]) => {
    data.sort((a: Rate, b: Rate) => {
      return a.cc > b.cc ? 1 : -1;
    });
    const popular = ['EUR', 'USD'];

    popular.forEach((element) => {
      let i = 0;
      for (i = 0; i < data.length; i++) {
        if (data[i].cc === element) {
          data.unshift(new Rate(data[i].txt, data[i].rate, element));
          data.splice(i + 1, 1);
          i = data.length;
        }
      }
    });
  };
}
