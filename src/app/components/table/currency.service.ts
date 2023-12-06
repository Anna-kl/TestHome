import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {ICurrency} from "./ICurrency";
import {environment} from "../../../environment/environment";
import {Observable} from "rxjs";


@Injectable()

export  class CurrencyService {
  //  private url = 'https://localhost:44304/api/auths/';

  private url = environment.Uri + 'currencies/';

  constructor(private http: HttpClient) {

  }

  getCurrencyYear(year: number): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.url}GetAllData/${year}`);
  }

  getCurrencyNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}GetCurrencyNames`);
  }
}
