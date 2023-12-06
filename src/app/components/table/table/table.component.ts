import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../currency.service";
import {Observable} from "rxjs";
import {ICurrency} from "../ICurrency";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [CurrencyService]
})
export class TableComponent implements OnInit {
  private date: Date = new Date();
  currencies$: Observable<ICurrency[]>|null = null;
  currencyNames$: Observable<string[]>|null = null;

  constructor(private _api: CurrencyService) {
  }
  ngOnInit(): void {

    this.currencies$ = this._api.getCurrencyYear(this.date.getFullYear());
    this.currencyNames$ = this._api.getCurrencyNames();
  }

}
