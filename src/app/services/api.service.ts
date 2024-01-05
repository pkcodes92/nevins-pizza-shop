import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AddPizzaSauceRequest } from '../models/request';
import { Observable } from 'rxjs';
import { AddPizzaSauceResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + 'api';

  constructor(private http: HttpClient) { }

  addSauce(addSauceRequest: AddPizzaSauceRequest): Observable<AddPizzaSauceResponse> {
    return this.http.post<AddPizzaSauceResponse>(this.apiUrl + '/PizzaSauce/AddPizzaSauce', JSON.stringify(addSauceRequest));
  }
}
