import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AddPizzaSauceRequest, UpdatePizzaSauceRequest } from '../models/request';
import { Observable } from 'rxjs';
import { AddPizzaSauceResponse, DeletePizzaSauceResponse, GetPizzaSauceResponse, GetPizzaSaucesResponse, UpdatePizzaSauceResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + 'api';

  constructor(private http: HttpClient) { }

  // #region Adding entities
  addSauce(addSauceRequest: AddPizzaSauceRequest): Observable<AddPizzaSauceResponse> {
    let reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AddPizzaSauceResponse>(this.apiUrl + '/PizzaSauce/AddPizzaSauce', JSON.stringify(addSauceRequest), {headers: reqHeaders});
  }
  // #endregion

  // #region Getting entities
  getAllSauces(): Observable<GetPizzaSaucesResponse> {
    return this.http.get<GetPizzaSaucesResponse>(this.apiUrl + '/PizzaSauce/GetAllSauces');
  }

  getPizzaSauce(id: number): Observable<GetPizzaSauceResponse> {
    return this.http.get<GetPizzaSauceResponse>(this.apiUrl + `/PizzaSauce/GetPizzaSauceById?id=${id}`);
  }
  // #endregion

  // #region Updating entities
  updateSauce(updateSauceRequest: UpdatePizzaSauceRequest): Observable<UpdatePizzaSauceResponse> {
    let reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<UpdatePizzaSauceResponse>(this.apiUrl + '/PizzSauce/UpdatePizzaSauce', JSON.stringify(updateSauceRequest), { headers: reqHeaders});
  }
  // #endregion

  // #region Deleting entities
  deleteSauce(id: number): Observable<DeletePizzaSauceResponse> {
    return this.http.delete<DeletePizzaSauceResponse>(this.apiUrl + `/PizzaSauce/DeleteSauce?id=${id}`);
  }
  // #endregion
}
