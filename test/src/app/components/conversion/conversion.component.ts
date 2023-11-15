import { Component, Input, OnChanges } from '@angular/core';
import { Rate } from '../../models/Rate';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  template: `<div class="flex items-center justify-center m-4 pt-8">
    @if(ready) {
    <div
      class="bg-blue-200 border border-blue-300 rounded p-4 justify-center items-center max-w-screen-sm"
    >
      <div class="flex justify-center">
        <h2 class="font-bold text-xl">Convert currencies</h2>
      </div>
      <div class="flex rounded my-4">
        <input
          type="number"
          name="inpt1"
          maxlength="5"
          [(ngModel)]="inpt1"
          (ngModelChange)="onchangeVA()"
          class="text-2xl p-5 focus:outline-blue-400"
        />
        <select
          [(ngModel)]="sel1"
          (change)="onchangeA()"
          class="outline-none text-2xl px-4 py-2"
        >
          @for(rate of rates; track rate.cc) {
          <option>{{ rate.cc }}</option>
          }
        </select>
      </div>
      <div class="flex rounded my-4">
        <input
          type="number"
          name="inpt2"
          [(ngModel)]="inpt2"
          (ngModelChange)="onchangeVB()"
          class="text-2xl p-5 focus:outline-blue-400"
        />
        <select
          [(ngModel)]="sel2"
          (change)="onchangeB()"
          class="outline-none text-2xl px-4 py-2"
        >
          @for(rate of rates; track rate.cc) {
          <option>{{ rate.cc }}</option>
          }
        </select>
      </div>
    </div>
    } @else {
    <div class="mt-4 text-gray-700 text-lg">Loading...</div>
    }
  </div>`,
})
export class ConversionComponent implements OnChanges {
  constructor() {}

  @Input() data: Rate[] = [];

  rates: Rate[] = [new Rate('Curr name1', 1, '---')];
  currency1: Rate = this.rates[0];
  currency2: Rate = this.rates[0];
  sel1: string = this.currency1.cc;
  sel2: string = this.currency2.cc;
  inpt1: number = 1;
  inpt2: number = 1;

  ready: boolean = false;

  ngOnChanges() {
    if (this.data.length > 1) {
      this.rates = this.data;

      this.currency1 = this.rates[1];
      this.currency2 = this.rates[0];

      this.inpt1 = 1;
      this.sel1 = this.currency1.cc;
      this.sel2 = this.currency2.cc;
      this.onchangeVA();
      this.ready = true;
    }
  }

  onchangeVA() {
    this.inpt2 =
      Math.round(
        ((this.currency1.rate * this.inpt1) / this.currency2.rate) * 10000
      ) / 10000;
  }
  onchangeVB() {
    this.inpt1 =
      Math.round(
        ((this.currency2.rate * this.inpt2) / this.currency1.rate) * 10000
      ) / 10000;
  }

  onchangeA() {
    const c1 = this.rates.find((item: Rate) => item.cc === this.sel1);
    if (c1) {
      this.currency1 = c1;
    }
    this.onchangeVA();
  }
  onchangeB() {
    const c2 = this.rates.find((item: Rate) => item.cc === this.sel2);
    if (c2) {
      this.currency2 = c2;
    }
    this.onchangeVB();
  }
}
