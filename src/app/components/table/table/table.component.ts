import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../currency.service";
import {Observable} from "rxjs";
import {ICurrency} from "../ICurrency";
import {AsyncPipe, DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    DatePipe,
    NgbInputDatepicker,
    NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [CurrencyService]
})
export class TableComponent implements OnInit {
  private date: Date = new Date();
  currencies$: Observable<ICurrency[]>|null = null;
  currencyNames$: Observable<string[]>|null = null;
  model: NgbDateStruct|null = null;
  name: string|null = null;
  constructor(private _api: CurrencyService) {
  }
  ngOnInit(): void {

    this.currencies$ = this._api.getCurrencyYear(this.date.getFullYear());
    this.currencyNames$ = this._api.getCurrencyNames();
  }

  getDateCurrencies(currencies: ICurrency[]) {
    return currencies.map(_ => _.date);
  }

  getCurrenciesForDate(date: Date, currencies: ICurrency[]) {
    return currencies.filter(_ => _.date === date)
        .map(_ => _.currencyRate);
  }

  getCurrencies() {
    if (this.model) {
      this.date = new Date(this.model?.year, this.model?.month - 1,
          this.model?.day, 0, 0, 0);
      this.currencies$ = this._api.getCurrencyDate(this.date, this.name);
    }
  }

  getCurrenciesForName(name: string) {
    this.name = name;
    this.currencies$ = this._api.getCurrencyDate(this.date, name);

  }
}
