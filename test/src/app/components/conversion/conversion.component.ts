import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { Rate } from '../../models/Rate';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [
    FormsModule,
    LoadingComponent,
    ReactiveFormsModule,
    CustomInputComponent,
    CustomSelectComponent,
  ],
  templateUrl: './conversion.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConversionComponent),
      multi: true,
    },
  ],
})
export class ConversionComponent implements ControlValueAccessor {
  constructor() {}

  @Input() data: Rate[] = [];
  @Output() inputChange: EventEmitter<number> = new EventEmitter<number>();

  rates: Rate[] = [new Rate('Curr name1', 1, '---')];
  currency1: Rate = this.rates[0];
  currency2: Rate = this.rates[0];
  sel1: string = this.currency1.cc;
  sel2: string = this.currency2.cc;
  inpt1: number = 1;
  inpt2: number = 1;

  ready: boolean = false;

  private onChange: any = () => {};
  writeValue(value: number): void {
    this.inpt1 = value;
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  getRates(rates: Rate[]) {
    if (rates && rates.length > 0) {
      return rates.map((rate) => ({
        cc: rate.cc,
        txt: rate.txt,
        rate: rate.rate,
      }));
    }
    return [];
  }
  registerOnTouched(fn: any): void {}

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
    this.onChange(this.inpt1);
    this.inputChange.emit(this.inpt1);
  }
  onchangeVB() {
    this.inpt1 =
      Math.round(
        ((this.currency2.rate * this.inpt2) / this.currency1.rate) * 10000
      ) / 10000;
  }

  onchangeA(event: Event) {
    const selectValue = (event.target as HTMLSelectElement).value;
    this.sel1 = selectValue;
    const c1 = this.rates.find((item: Rate) => item.cc === this.sel1);
    if (c1) {
      this.currency1 = c1;
    }
    this.onchangeVA();
  }
  onchangeB(event: Event) {
    const selectValue = (event.target as HTMLSelectElement).value;
    this.sel2 = selectValue;
    const c2 = this.rates.find((item: Rate) => item.cc === this.sel2);
    if (c2) {
      this.currency2 = c2;
    }
    this.onchangeVB();
  }
}
